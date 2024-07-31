import { Button } from '@components/common/Button'
import Image from 'next/image'
import FilledHeartIcon from '@components/common/icons/FilledHeartIcon'
import UnfilledHeartIcon from '@components/common/icons/UnfilledHeartIcon'
import CommentsIcon from '@components/common/icons/CommentsIcon'
import ShareIcon from '@components/common/icons/ShareIcon'
import FilledStar from '@components/common/icons/FilledStar'
import UnfilledStar from '@components/common/icons/UnfilledStar'
import { IPost } from '@customTypes/postType'
import { formatTime } from '@utils/formatTime'
import { useSession } from 'next-auth/react'
import usePostImageUrl from '@hooks/usePostImageUrl'
import useUserInfo from '@hooks/useUserInfo'
import {
  incrementLikesCount,
  decrementLikesCount,
} from '@utils/api/posts/updateLikesCount'
import {
  addUserToLikesByUsersField,
  removeUserFromLikesByUsersField,
} from '@utils/api/posts/updateLikesByUsers'

export const Post = ({
  post,
  handleOpenComments,
  index,
}: {
  post: IPost
  handleOpenComments: (index: number) => void
  index: number
}) => {
  const { userInfo } = useUserInfo(post.userId)
  const {
    postImageUrl,
    loading: postImageUrlLoading,
    error: postImageUrlError,
  } = usePostImageUrl(post.imageName)
  const { data: session, update } = useSession()

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
  if (!post || !userInfo.firstName || !userInfo.lastName || !session)
    return <></>

  return (
    <div className="grid grid-cols-[40px_1fr] gap-3 w-full py-6 border-b border-b-[#D9D9D9] xl:border xl:border-[#DFE7EB] xl:rounded-[8px] xl:py-8 xl:px-10 xl:flex xl:flex-col xl:bg-white">
      {/* Profile Icon */}
      <div className="xl:flex xl:items-center xl:gap-3 xl:rounded-[4px]">
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
        <p className="font-lora font-bold text-primary text-xl hidden xl:block">
          {`${userInfo.firstName} ${userInfo.lastName}`}
        </p>
      </div>

      {/* Post Content */}
      <div className="w-full">
        {/* User's name */}
        <div className="flex items-center gap-2 font-lora font-bold text-primary xl:hidden">
          <p> {`${userInfo.firstName} ${userInfo.lastName}`}</p>
        </div>
        {/* Timestamp */}
        <span className="block font-montserrat font-semibold text-[13px] text-[#707070] leading-[20px] xl:hidden">
          {formatTime(Number(post.timestamp))}
        </span>
        {/* Post caption */}
        <div className="mt-[6px]">
          <p className="font-montserrat font-medium text-primary text-[14px] leading-[20px] xl:text-[18px] xl:leading-[24px]">
            {post.caption}
            <span className="text-[#8D8D8D] pl-2 cursor-pointer xl:hidden">
              more
            </span>
          </p>
        </div>

        {/* Timestamp */}
        <span className="hidden font-montserrat font-semibold text-[13px] text-[#707070] leading-[20px] pt-2 xl:block">
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
            icon={<CommentsIcon />}
            clickHandler={() => handleOpenComments(index)}
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
    </div>
  )
}

// TEMPORARY
// export const TempUpdatePost = () => {
//   return (
//     <div className="grid grid-cols-[40px_1fr] gap-3 w-full py-6 border-b border-b-[#D9D9D9] xl:border xl:border-[#DFE7EB] xl:rounded-[8px] xl:py-8 xl:px-10 xl:flex xl:flex-col xl:bg-white">
//       {/* Profile Icon */}
//       <div className="xl:flex xl:gap-3 xl:items-center">
//         <Image src="/tempPostIcon2.png" alt="" width="40" height="40" />
//         <p className="hidden font-lora font-bold text-xl text-primary xl:block">
//           Naruto Uzumaki
//           <span className="font-medium ml-2">just completed:</span>
//         </p>
//       </div>

//       {/* Post Content */}
//       <div className="w-full">
//         {/* User's name + timestamp */}
//         <div className="flex items-center gap-1 font-lora font-bold text-primary flex-wrap xl:hidden">
//           <p>Naruto Uzumaki</p>
//           <span className="font-medium">just completed:</span>
//         </div>
//         {/* Timestamp */}
//         <span className="block font-montserrat font-semibold text-[13px] text-[#707070] leading-[20px]">
//           2 minutes ago
//         </span>
//         {/* Book Image + Book Details */}
//         <div className="flex gap-4 mt-4">
//           {/* Book */}
//           <div className="w-[75px] h-[116px] xl:w-[90px] xl:h-[140px]">
//             <Image
//               src="/tempUpdateImage1.png"
//               alt=""
//               width="75"
//               height="116"
//               className="xl:w-[90px] xl:h-[140px]"
//             />
//           </div>

//           {/* Book Details */}
//           <div className="font-montserrat text-primary leading-[20px]">
//             <p className="font-bold text-[15px] leading-[20px] mb-1 xl:font-montserrat xl:text-xl xl:leading-[28px]">
//               Seals and Symbols: A Guide to Fuinjutsu
//             </p>
//             <p className="font-medium text-[14px] leading-[24px] xl:font-montserrat xl:text-base xl:font-semibold">
//               by Minato Uzumaki
//             </p>
//             <div className="flex gap-1 mt-[6px]">
//               <FilledStar />
//               <FilledStar />
//               <FilledStar />
//               <FilledStar />
//               <UnfilledStar />
//             </div>
//           </div>
//         </div>

//         {/* Buttons Container */}
//         <div className="flex mt-3 gap-2 xl:mt-8 xl:gap-4">
//           <Button
//             variant="tertiary"
//             bordersRounded={true}
//             icon={<UnfilledHeartIcon />}
//             clickHandler={() => {}}
//           >
//             12k
//           </Button>
//           <Button
//             variant="tertiary"
//             bordersRounded={true}
//             icon={<CommentsIcon />}
//             clickHandler={() => {}}
//           >
//             562
//           </Button>
//           <Button
//             variant="tertiary"
//             bordersRounded={true}
//             icon={<ShareIcon />}
//             clickHandler={() => {}}
//             className="ml-auto"
//           >
//             Share
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }

// TEMPORARY
// export const TempUpdatePost2 = () => {
//   return (
//     <div className="grid grid-cols-[40px_1fr] gap-3 w-full py-6 border-b border-b-[#D9D9D9] xl:border xl:border-[#DFE7EB] xl:rounded-[8px] xl:py-8 xl:px-10 xl:flex xl:flex-col xl:bg-white">
//       {/* Profile Icon */}
//       <div className="xl:flex xl:gap-3 xl:items-center">
//         <Image src="/tempPostIcon3.png" alt="" width="40" height="40" />
//         <p className="hidden font-lora font-bold text-xl text-primary xl:block">
//           Sakura Haruno
//           <span className="font-medium ml-2">wants to read:</span>
//         </p>
//       </div>
//       {/* Post Content */}
//       <div className="w-full">
//         {/* User's name + timestamp */}
//         <div className="flex items-center gap-1 font-lora font-bold text-primary flex-wrap xl:hidden">
//           <p>Sakura Haruno</p>
//           <span className="font-medium">wants to read:</span>
//         </div>

//         {/* Timestamp */}
//         <span className="block font-montserrat font-semibold text-[13px] text-[#707070] leading-[20px]">
//           2 minutes ago
//         </span>

//         {/* Book Image + Book Details */}
//         <div className="flex gap-4 mt-4">
//           {/* Book */}
//           <div className="w-[75px] h-[116px] xl:w-[90px] xl:h-[140px]">
//             <Image
//               src="/tempUpdateImage2.png"
//               alt=""
//               width="75"
//               height="116"
//               className="xl:w-[90px] xl:h-[140px]"
//             />
//           </div>

//           {/* Book Details */}
//           <div className="font-montserrat text-primary leading-[20px]">
//             <p className="font-bold text-[15px] leading-[20px] mb-1 xl:font-montserrat xl:text-xl xl:leading-[28px]">
//               The Uchiha Clan: A History of Power and Tragedy
//             </p>
//             <p className="font-medium text-[14px] leading-[24px] xl:font-montserrat xl:text-base xl:font-semibold">
//               by Itachi Uchiha
//             </p>
//             <div className="flex gap-1 mt-[6px]">
//               <FilledStar />
//               <FilledStar />
//               <FilledStar />
//               <FilledStar />
//               <UnfilledStar />
//             </div>
//           </div>
//         </div>

//         {/* Buttons Container */}
//         <div className="flex mt-3 gap-2 xl:mt-8 xl:gap-4">
//           <Button
//             variant="tertiary"
//             bordersRounded={true}
//             icon={<UnfilledHeartIcon />}
//             clickHandler={() => {}}
//           >
//             12k
//           </Button>
//           <Button
//             variant="tertiary"
//             bordersRounded={true}
//             icon={<CommentsIcon />}
//             clickHandler={() => {}}
//           >
//             562
//           </Button>
//           <Button
//             variant="tertiary"
//             bordersRounded={true}
//             icon={<ShareIcon />}
//             clickHandler={() => {}}
//             className="ml-auto"
//           >
//             Share
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }
