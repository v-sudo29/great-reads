import { IPost } from '@customTypes/postType'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import useUserInfo from '@hooks/useUserInfo'
import Comment from './Comment'
import getCurrentTimestamp from '@utils/getCurrentTimestamp'

const NestedCommentsSection = ({ post }: { post: IPost }) => {
  const { data: session, update } = useSession()
  const { userInfo } = useUserInfo(post.userId)

  const handleEnterKeyPressedCreateComment = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const inputElement = e.target as HTMLInputElement
    const userInput = inputElement.value
    const currentPostId = inputElement.getAttribute('data-post-id')

    if (
      e.key === 'Enter' &&
      userInput !== '' &&
      session &&
      session.user.id &&
      currentPostId
    ) {
      // Create new comment
      const newComment = {
        postId: currentPostId,
        userId: session.user.id,
        userComment: userInput,
        timestamp: getCurrentTimestamp(),
        firstName: session.user.firstName,
        lastName: session.user.lastName,
        imageName: session.user.imageName ?? null,
      }

      // Update session token
      await update({ comments: [...session.user.comments, newComment] })
    }

    if (e.key === 'Enter' && inputElement.value === '') {
      alert('Input is empty! Please try again')
    }
  }

  if (!session || !session.user.id) return <></>
  return (
    <div className="mt-8 overflow-y-scroll">
      <div className="flex items-center gap-4 h-[54px]">
        {/* Commenter's Profile Image */}
        <div className="max-w-[40px] max-h-[40px] h-full w-full rounded-full overflow-hidden border">
          <Image
            src={
              userInfo.profileImageUrl
                ? userInfo.profileImageUrl
                : '/tempPostIcon1.png'
            }
            alt=""
            width="40"
            height="40"
            className="scale-150"
          />
        </div>

        {/* Input */}
        <input
          className="font-montserrat font-medium placeholder:text-[#A4B1B8] flex w-full h-full border-[1.5px] border-black border-opacity-20 p-[14px] rounded"
          type="text"
          placeholder="Type your comment..."
          onKeyDown={(e) => handleEnterKeyPressedCreateComment(e)}
          data-post-id={post._id}
        />
      </div>

      {/* Past Comments */}
      <div className="flex flex-col gap-8 mt-8">
        {post.comments.length > 0 ? (
          post.comments.map((comment: any, i: number) => {
            return (
              <Comment
                key={`${post._id}-${i}-comment`}
                comment={comment}
                post={post}
              />
            )
          })
        ) : (
          <>No comments</>
        )}
      </div>
    </div>
  )
}

export default NestedCommentsSection
