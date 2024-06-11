import Image from "next/image"
import { useSession } from "next-auth/react"
import { useProfileImage } from "@context/ProfileImageProvider"
import { useEffect, useState } from "react"

const ProfilePicture = () => {
  const [isProfileHovered, setIsProfileHovered] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const { data: session, update } = useSession()
  const { imageUrl, setImageUrl } = useProfileImage()

  // Handles file upload if file state changes
  useEffect(() => {
    if (file) {
      const handleUpload = async () => {
        if (file && session && session.user && session.user.email) {
          const formData = new FormData()

          formData.append('file', file)
          formData.append('id', session.user.id)

          // Send form data
          try {
            const res = await fetch('/api/profile/upload', {
              method: 'POST',
              body: formData
            })
            const data = await res.json()
            if (data.success && data.imageName) {
              
              // Update session imageName property
              update({
                imageName: data.imageName
              })

              // Update userContext imageUrl
              setImageUrl(data.imageUrl)
            }
          } catch (error) {
            console.log(error)
          }
        }
      }
      handleUpload()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file])

  if (session === undefined) return <></>

  return (
    <div className='relative border w-[104px] h-[104px] rounded-full overflow-hidden'>
      <Image
        className='w-full min-w-full scale-150 h-auto'
        src={              
          // If user has imageName -- display imageUrl
          (session?.user.imageName && imageUrl) ? `${imageUrl}` :
          // Else if user has defaultImage -- display defaultImage
          session?.user.defaultImage ? `${session.user.defaultImage}` :
          // Else if user has none, display default profile pic
          '/../default-profile-pic.svg'
        }
        alt=''
        width='104'
        height='104'
      />
      {isProfileHovered && (
        <>
          <div className='absolute z-20 flex top-0 w-full h-full bg-black opacity-50'></div>
          <p className='absolute z-20 flex top-0 w-full h-full justify-center items-center text-white'>
            Update
          </p>
        </>
      )}
      <input
        className='absolute top-[-50px] z-20 left-0 w-full h-[calc(100%_+_50px)] cursor-pointer'
        onChange={(e) => setFile(e.target.files && e.target.files[0])}
        onMouseEnter={() => setIsProfileHovered(true)}
        onMouseLeave={() => setIsProfileHovered(false)}
        type='file'
        accept="image/*"
      />
    </div>
  )
}

export default ProfilePicture