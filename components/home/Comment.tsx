import { IPost } from '@customTypes/postType'
import Image from 'next/image'
import useUserInfo from '@hooks/useUserInfo'
import { formatTime } from '@utils/formatTime'
import { useSession } from 'next-auth/react'

interface CommentProps {
  comment: {
    firstName: string
    imageName: string
    lastName: string
    postId: string
    timestamp: number
    userComment: string
    userId: string
    _id: string
  }
  post: IPost
}

const Comment = ({ comment, post }: CommentProps) => {
  const { userInfo } = useUserInfo(comment.userId)
  const { data: session, update } = useSession()

  const handleDeleteComment = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const buttonElement = e.target as HTMLButtonElement

    if (buttonElement && session && session.user.id) {
      const postId = buttonElement.getAttribute('data-post-id')
      const userId = session.user.id
      const commentId = buttonElement.getAttribute('data-comment-id')

      const response = await fetch(`/api/comments/comment/delete`, {
        method: 'DELETE',
        body: JSON.stringify({
          postId,
          userId,
          commentId,
        }),
      })
      const data = await response.json()

      const updatedComments = session.user.comments.filter(
        (comment) => comment._id !== commentId
      )
      console.log(updatedComments)
      if (data) {
        await update({ comments: updatedComments })
        await update({ posts: data.posts })
      }
    }
  }
  if (!comment || !session || !post) return <></>
  return (
    <div className="flex gap-4" data-user-id={comment.userId}>
      {/* Commenter's Profile Image */}
      <div className="max-w-[40px] max-h-[40px] w-full h-full rounded-full overflow-hidden border">
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

      {/* Comment Content */}
      <div className="w-full">
        <div className="flex items-center justify-between">
          {/* Commenter's Full Name */}
          <p className="font-lora font-bold text-primary text-xl">
            {comment.firstName} {comment.lastName}
          </p>
          {/* Timestamp */}
          <span className="font-montserrat font-semibold text-[15px] text-[#878787]">
            {formatTime(comment.timestamp)}
          </span>
        </div>
        <p className="font-montserrat text-[18px] leading-[26px] text-primary">
          {comment.userComment}
        </p>
        {comment.userId === session.user.id && (
          <button
            className="bg-red-400 text-white font-montserrat font-semibold rounded-[4px] px-5 py-1 mt-5"
            onClick={(e) => handleDeleteComment(e)}
            data-post-id={post._id}
            data-comment-id={comment._id}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  )
}

export default Comment
