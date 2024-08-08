import Image from 'next/image'
import useUserInfo from '@hooks/useUserInfo'
import { useSession } from 'next-auth/react'
import { Button } from '@components/common/Button'
import ExitIconTwo from '@components/common/icons/ExitIconTwo'
import FileUploadIcon from '@components/common/icons/FileUploadIcon'
import { useState } from 'react'

interface CreatePostModalProps {
  handleCloseCreatePostModal: () => void
}

const CreatePostModal = ({
  handleCloseCreatePostModal,
}: CreatePostModalProps) => {
  const { data: session, update } = useSession()
  const { userInfo } = useUserInfo(session?.user.id ?? '')
  const [userInput, setUserInput] = useState('')
  const [isUserInputEmpty, setIsUserInputEmpty] = useState(true)
  const [file, setFile] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<null | string>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]))
      setFile(e.target.files && e.target.files[0])
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value

    if (input && input !== '') {
      setUserInput(input)
      setIsUserInputEmpty(false)
    } else {
      setUserInput('')
      setIsUserInputEmpty(true)
    }
  }

  const handleUpload = async () => {
    if (file && session && session.user && session.user.email) {
      const formData = new FormData()

      formData.append('file', file)
      formData.append('id', session.user.id)

      // Send form data
      // 1. Uploads file to s3
      // 2. Gets returned db imageName and s3 signed imageUrl
      // 3. Update imageName in db, sets imageUrl on client
      try {
        const res = await fetch('/api/posts/post/upload', {
          method: 'POST',
          body: formData,
        })
        const data = await res.json()
        if (data.success && data.imageName) return data
        else return null
      } catch (error) {
        console.log(error)
      }
    } else return null
  }

  const handleCreatePost = async () => {
    if (userInput === '' || !session || !session.user.id) return
    try {
      const currentTimestamp = new Date().getTime()
      const uploadResponse = await handleUpload()

      const requestObject = {
        caption: userInput,
        timestamp: currentTimestamp,
        imageName: uploadResponse ? uploadResponse.imageName : null,
        likesCount: 0,
        comments: [],
        likesByUsers: [],
      }

      await update({
        posts: [...session.user.posts, requestObject],
      })
      handleCloseCreatePostModal()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="fixed flex justify-center top-0 left-0 w-full h-full overflow-y-auto z-50">
      {/* Overlay */}
      <div
        className="fixed top-0 left-0 w-screen h-full bg-black opacity-20"
        onClick={handleCloseCreatePostModal}
      ></div>

      {/* Modal */}
      <div className="relative flex flex-col bg-white max-w-[820px] w-full h-full max-h-[376px] pt-6 mt-[116px] mb-[100px] mx-[40px] rounded-[8px] z-50">
        {/* Profile Pic + Name + Exit Button*/}
        <div className="flex items-center justify-between px-6">
          <div className="flex items-center gap-4 rounded-[4px]">
            <div className="max-w-[64px] max-h-[64px] rounded-full overflow-hidden border">
              {userInfo.profileImageUrl ? (
                <Image
                  src={
                    userInfo.profileImageUrl
                      ? userInfo.profileImageUrl
                      : '/tempPostIcon1.png'
                  }
                  alt=""
                  width="64"
                  height="64"
                  className="scale-150"
                />
              ) : (
                <div className="w-16 h-16"></div>
              )}
            </div>
            {userInfo.firstName && userInfo.lastName && (
              <p className="font-lora font-bold text-primary text-xl">
                {`${userInfo.firstName} ${userInfo.lastName}`}
              </p>
            )}
          </div>
          <button className="p-5" onClick={handleCloseCreatePostModal}>
            <ExitIconTwo />
          </button>
        </div>

        {/* Text Area */}
        <textarea
          className="px-6 resize-none mt-6 focus:outline-none font-montserrat font-medium text-[18px] text-primary leading-[28px] h-full placeholder:text-[#BAC2BE]"
          placeholder="Share your thoughts on something you read..."
          onChange={(e) => handleInputChange(e)}
        />

        {/* Optional Image Preview */}
        {previewImage && (
          <div className="px-6 pb-4">
            <Image
              src={previewImage}
              alt="Preview image"
              width={200}
              height={200}
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center justify-between py-4 px-6 mt-auto border-t border-t-[#DFE7EB]">
          <button className="relative cursor-pointer">
            <div className="cursor-pointer">
              <FileUploadIcon />
            </div>
            <input
              type="file"
              name="postImage"
              className="absolute top-0 left-0 w-6 h-6 opacity-0 cursor-pointer pointer-events-auto z-50 text-[0px]"
              onChange={(e) => handleImageChange(e)}
            />
          </button>
          <Button
            variant="primary"
            bordersRounded={true}
            clickHandler={handleCreatePost}
            className={
              isUserInputEmpty
                ? 'h-11 text-base px-5 py-3 opacity-40'
                : 'h-11 text-base px-5 py-3'
            }
            disabled={isUserInputEmpty}
          >
            Create Post
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreatePostModal
