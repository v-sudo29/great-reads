import { IPost } from '@customTypes/postType'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import useUserInfo from '@hooks/useUserInfo'
import Comment from './Comment'

const NestedCommentsSection = ({ post }: { post: IPost }) => {
  const { data: session } = useSession()
  const { userInfo } = useUserInfo(post.userId)
  console.log(post.comments)
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
          className="font-montserrat font-medium text-[#A4B1B8] flex w-full h-full border-[1.5px] border-black border-opacity-20 p-[14px] rounded"
          type="text"
          placeholder="Type your comment..."
          // onKeyDown={(e) => handleEnterKeyPressedCreateComment(e)}
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
                session={session}
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
