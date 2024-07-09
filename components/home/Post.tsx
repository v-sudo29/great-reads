import { Button } from '@components/common/Button'
import Image from 'next/image'
import HeartIcon from '@components/common/icons/HeartIcon'
import CommentsIcon from '@components/common/icons/CommentsIcon'
import ShareIcon from '@components/common/icons/ShareIcon'
import FilledStar from '@components/common/icons/FilledStar'
import UnfilledStar from '@components/common/icons/UnfilledStar'
import { useEffect, useState } from 'react'
import { IPost } from '@customTypes/postType'
import { formatTime } from '@utils/formatTime'

export const Post = ({ post }: { post: IPost }) => {
  const [firstName, setFirstName] = useState<string | null>(null)
  const [lastName, setLastName] = useState<string | null>(null)
  const [imageName, setImageName] = useState<string | null>(null)
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)
  const [postImageUrl, setPostImageUrl] = useState<string | null>(null)

  // Fetch user's firstName and lastName.
  // If post imageName exists, fetch post's imageUrl
  useEffect(() => {
    if (post) {
      const fetchUserInfo = async () => {
        try {
          const response = await fetch(`/api/users/user/${post.userId}`)
          const data = await response.json()

          setFirstName(data.data.firstName)
          setLastName(data.data.lastName)
          setImageName(data.data.imageName)
        } catch (err) {
          console.log(err)
        }
      }
      fetchUserInfo()
    }
    if (post && post.imageName) {
      const fetchPostImageUrl = async () => {
        try {
          const response = await fetch(`/api/posts/post/imageUrl`, {
            method: 'POST',
            body: JSON.stringify({
              imageName: post.imageName,
            }),
          })
          const data = await response.json()
          setPostImageUrl(data.imageUrl)
        } catch (err) {
          console.log(err)
        }
      }
      fetchPostImageUrl()
    }
  }, [post])

  // Fetch userProfileImage
  useEffect(() => {
    if (imageName) {
      const fetchUserProfileImage = async () => {
        try {
          const response = await fetch(`/api/users/user/imageUrl`, {
            method: 'POST',
            body: JSON.stringify({
              imageName: imageName,
            }),
          })
          const data = await response.json()
          setProfileImageUrl(data.imageUrl)
        } catch (err) {
          console.log(err)
        }
      }
      fetchUserProfileImage()
    }
  }, [imageName])

  // TODO: skeleton component
  if (!post || !firstName || !lastName) return <></>
  return (
    <div className="grid grid-cols-[40px_1fr] gap-3 w-full py-6 border-b border-b-[#D9D9D9] xl:border xl:border-[#DFE7EB] xl:rounded-[8px] xl:py-8 xl:px-10 xl:flex xl:flex-col xl:bg-white">
      {/* Profile Icon */}
      <div className="xl:flex xl:items-center xl:gap-3 xl:rounded-[4px]">
        <div className="max-w-[40px] max-h-[40px] rounded-full overflow-hidden border">
          <Image
            src={profileImageUrl ? profileImageUrl : '/tempPostIcon1.png'}
            alt=""
            width="40"
            height="40"
            className="scale-150"
          />
        </div>
        <p className="font-lora font-bold text-primary text-xl hidden xl:block">
          {`${firstName} ${lastName}`}
        </p>
      </div>

      {/* Post Content */}
      <div className="w-full">
        {/* User's name */}
        <div className="flex items-center gap-2 font-lora font-bold text-primary xl:hidden">
          <p> {`${firstName} ${lastName}`}</p>
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
              className="w-full"
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
            type="tertiary"
            bordersRounded={true}
            icon={<HeartIcon />}
            clickHandler={() => {}}
          >
            12k
          </Button>
          <Button
            type="tertiary"
            bordersRounded={true}
            icon={<CommentsIcon />}
            clickHandler={() => {}}
          >
            562
          </Button>
          <Button
            type="tertiary"
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

export const TempUpdatePost = () => {
  return (
    <div className="grid grid-cols-[40px_1fr] gap-3 w-full py-6 border-b border-b-[#D9D9D9] xl:border xl:border-[#DFE7EB] xl:rounded-[8px] xl:py-8 xl:px-10 xl:flex xl:flex-col xl:bg-white">
      {/* Profile Icon */}
      <div className="xl:flex xl:gap-3 xl:items-center">
        <Image src="/tempPostIcon2.png" alt="" width="40" height="40" />
        <p className="hidden font-lora font-bold text-xl text-primary xl:block">
          Naruto Uzumaki
          <span className="font-medium ml-2">just completed:</span>
        </p>
      </div>

      {/* Post Content */}
      <div className="w-full">
        {/* User's name + timestamp */}
        <div className="flex items-center gap-1 font-lora font-bold text-primary flex-wrap xl:hidden">
          <p>Naruto Uzumaki</p>
          <span className="font-medium">just completed:</span>
        </div>
        {/* Timestamp */}
        <span className="block font-montserrat font-semibold text-[13px] text-[#707070] leading-[20px]">
          2 minutes ago
        </span>
        {/* Book Image + Book Details */}
        <div className="flex gap-4 mt-4">
          {/* Book */}
          <div className="w-[75px] h-[116px] xl:w-[90px] xl:h-[140px]">
            <Image
              src="/tempUpdateImage1.png"
              alt=""
              width="75"
              height="116"
              className="xl:w-[90px] xl:h-[140px]"
            />
          </div>

          {/* Book Details */}
          <div className="font-montserrat text-primary leading-[20px]">
            <p className="font-bold text-[15px] leading-[20px] mb-1 xl:font-montserrat xl:text-xl xl:leading-[28px]">
              Seals and Symbols: A Guide to Fuinjutsu
            </p>
            <p className="font-medium text-[14px] leading-[24px] xl:font-montserrat xl:text-base xl:font-semibold">
              by Minato Uzumaki
            </p>
            <div className="flex gap-1 mt-[6px]">
              <FilledStar />
              <FilledStar />
              <FilledStar />
              <FilledStar />
              <UnfilledStar />
            </div>
          </div>
        </div>

        {/* Buttons Container */}
        <div className="flex mt-3 gap-2 xl:mt-8 xl:gap-4">
          <Button
            type="tertiary"
            bordersRounded={true}
            icon={<HeartIcon />}
            clickHandler={() => {}}
          >
            12k
          </Button>
          <Button
            type="tertiary"
            bordersRounded={true}
            icon={<CommentsIcon />}
            clickHandler={() => {}}
          >
            562
          </Button>
          <Button
            type="tertiary"
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

export const TempUpdatePost2 = () => {
  return (
    <div className="grid grid-cols-[40px_1fr] gap-3 w-full py-6 border-b border-b-[#D9D9D9] xl:border xl:border-[#DFE7EB] xl:rounded-[8px] xl:py-8 xl:px-10 xl:flex xl:flex-col xl:bg-white">
      {/* Profile Icon */}
      <div className="xl:flex xl:gap-3 xl:items-center">
        <Image src="/tempPostIcon3.png" alt="" width="40" height="40" />
        <p className="hidden font-lora font-bold text-xl text-primary xl:block">
          Sakura Haruno
          <span className="font-medium ml-2">wants to read:</span>
        </p>
      </div>
      {/* Post Content */}
      <div className="w-full">
        {/* User's name + timestamp */}
        <div className="flex items-center gap-1 font-lora font-bold text-primary flex-wrap xl:hidden">
          <p>Sakura Haruno</p>
          <span className="font-medium">wants to read:</span>
        </div>

        {/* Timestamp */}
        <span className="block font-montserrat font-semibold text-[13px] text-[#707070] leading-[20px]">
          2 minutes ago
        </span>

        {/* Book Image + Book Details */}
        <div className="flex gap-4 mt-4">
          {/* Book */}
          <div className="w-[75px] h-[116px] xl:w-[90px] xl:h-[140px]">
            <Image
              src="/tempUpdateImage2.png"
              alt=""
              width="75"
              height="116"
              className="xl:w-[90px] xl:h-[140px]"
            />
          </div>

          {/* Book Details */}
          <div className="font-montserrat text-primary leading-[20px]">
            <p className="font-bold text-[15px] leading-[20px] mb-1 xl:font-montserrat xl:text-xl xl:leading-[28px]">
              The Uchiha Clan: A History of Power and Tragedy
            </p>
            <p className="font-medium text-[14px] leading-[24px] xl:font-montserrat xl:text-base xl:font-semibold">
              by Itachi Uchiha
            </p>
            <div className="flex gap-1 mt-[6px]">
              <FilledStar />
              <FilledStar />
              <FilledStar />
              <FilledStar />
              <UnfilledStar />
            </div>
          </div>
        </div>

        {/* Buttons Container */}
        <div className="flex mt-3 gap-2 xl:mt-8 xl:gap-4">
          <Button
            type="tertiary"
            bordersRounded={true}
            icon={<HeartIcon />}
            clickHandler={() => {}}
          >
            12k
          </Button>
          <Button
            type="tertiary"
            bordersRounded={true}
            icon={<CommentsIcon />}
            clickHandler={() => {}}
          >
            562
          </Button>
          <Button
            type="tertiary"
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
