import { Button } from '@components/common/Button'
import CommentsIcon from '@components/common/icons/CommentsIcon'
import ExitIcon from '@components/common/icons/ExitIcon'
import FilledHeartIcon from '@components/common/icons/FilledHeartIcon'
import ShareIcon from '@components/common/icons/ShareIcon'
import UnfilledHeartIcon from '@components/common/icons/UnfilledHeartIcon'
import { IPost } from '@customTypes/postType'
import usePostImageUrl from '@hooks/usePostImageUrl'
import useUserInfo from '@hooks/useUserInfo'
import {
  addUserToLikesByUsersField,
  removeUserFromLikesByUsersField,
} from '@utils/api/posts/updateLikesByUsers'
import {
  decrementLikesCount,
  incrementLikesCount,
} from '@utils/api/posts/updateLikesCount'
import { formatTime } from '@utils/formatTime'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

interface PostInCommentsProps {
  post: IPost
  handleCloseComments: (index: number) => void
  index: number
}

const PostInComments = ({
  post,
  handleCloseComments,
  index,
}: PostInCommentsProps) => {
  const { userInfo } = useUserInfo(post.userId)
  const { data: session, update } = useSession()
  const {
    postImageUrl,
    loading: postImageUrlLoading,
    error: postImageUrlError,
  } = usePostImageUrl(post.imageName)
  const isLikedByUser = session?.user.likedPosts.find(
    (currentId) => currentId === post._id
  )
    ? true
    : false

  const handleUpdateLikes = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      const likeButton = e.target as HTMLButtonElement
      const postId = likeButton.getAttribute('data-post-id')

      // Check if authenticated user has liked the post in likedPosts array
      if (
        session &&
        session?.user.likedPosts.find((currentId) => currentId === postId)
      ) {
        console.log('User has liked post before!')
        // UPDATE POST IN DATABASE - fetch API
        // 1. Update likesCount in Post - decrement likesCount in Post
        // 2. Remove userId from Post likesByUsers array

        // UPDATE SESSION TOKEN - update API
        // 1. Decrement post's "likesCount" and remove userId from likesByUsers array in session token
        // 2. Remove postId from "likedPosts" array of User

        const updatedPosts = session.user.posts.map((post) => {
          if (post._id === postId) {
            const updatedPost = {
              ...post,
            }
            updatedPost.likesCount = post.likesCount -= 1
            updatedPost.likesByUsers = updatedPost.likesByUsers.filter(
              (userId) => userId !== session.user.id
            )
            return updatedPost
          } else return post
        })

        const updatedLikedPosts = [
          ...session.user.likedPosts.filter(
            (likedPostId) => likedPostId !== postId
          ),
        ]

        // Update Post in database
        await decrementLikesCount(postId)
        await removeUserFromLikesByUsersField(postId, session.user.id)

        // Update session token
        await update({ posts: updatedPosts })
        await update({ likedPosts: updatedLikedPosts })
      } else {
        console.log('user has not liked post before!')

        if (session && session.user) {
          // UPDATE POST IN DATABASE - fetch API
          // 1. Update likesCount in Post
          // 2. Update userId of Post likesByUsers

          // UPDATE SESSION TOKEN - update API
          // 1. Increment post's "likesCount" and add userId to likesByUsers array in session token
          // 2. Add postId to "likedPosts" array of User

          const updatedPosts = session.user.posts.map((post) => {
            if (post._id === postId) {
              const newPost = {
                ...post,
              }
              newPost.likesCount = post.likesCount += 1
              newPost.likesByUsers = [...post.likesByUsers, session.user.id]
              return newPost
            } else return post
          })

          // Update post in database
          await incrementLikesCount(postId)
          await addUserToLikesByUsersField(postId, session.user.id)

          // Update session token
          await update({ posts: updatedPosts })
          await update({ likedPosts: [...session.user.likedPosts, postId] })
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  // TODO: skeleton component
  if (!post || !userInfo || !userInfo.firstName || !userInfo.lastName)
    return <></>

  return (
    <div className="w-full">
      {/* Profile Icon */}
      <div className="flex items-center gap-3 xl:flex xl:items-center xl:gap-3 xl:rounded-[4px]">
        <div className="max-w-[40px] max-h-[40px] rounded-full overflow-hidden border">
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
        <p className="font-lora font-bold text-primary text-xl">
          {userInfo.firstName && `${userInfo.firstName} ${userInfo.lastName}`}
        </p>
        <button className="ml-auto" onClick={() => handleCloseComments(index)}>
          <ExitIcon />
        </button>
      </div>

      {/* Post Content */}
      <div className="w-full">
        {/* Post caption */}
        <div className="mt-[6px]">
          <p className="font-montserrat font-medium text-primary text-[14px] leading-[20px] xl:text-[18px] xl:leading-[24px]">
            {post.caption}
          </p>
        </div>

        {/* Timestamp */}
        <span className="font-montserrat font-semibold text-[13px] text-[#707070] leading-[20px] pt-2">
          {formatTime(Number(post.timestamp))}
        </span>

        {/* Post image */}
        <div className="w-full mt-4 xl:mt-8">
          {postImageUrl && (
            <Image
              className="xl:w-auto xl:max-h-[400px]"
              src={postImageUrl}
              alt="Temporary alt description here"
              width="314"
              height="176"
            />
          )}
        </div>
      </div>

      {/* Buttons Container */}
      <div className="flex mt-3 gap-2 xl:mt-8 xl:gap-4">
        <Button
          variant="tertiary"
          bordersRounded={true}
          icon={isLikedByUser ? <FilledHeartIcon /> : <UnfilledHeartIcon />}
          clickHandler={(e) => handleUpdateLikes(e)}
          dataPostId={post._id}
        >
          {post.likesCount}
        </Button>
        <Button
          variant="tertiary"
          bordersRounded={true}
          icon={<CommentsIcon isCommentsOpen={true} />}
          clickHandler={() => {}}
        >
          {post.comments.length}
        </Button>
        <Button
          variant="tertiary"
          bordersRounded={true}
          icon={<ShareIcon />}
          clickHandler={() => {}}
          className="ml-auto"
        >
          Share
        </Button>
      </div>
    </div>
  )
}

export default PostInComments
