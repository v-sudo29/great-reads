'use client'
import { useSession } from 'next-auth/react'
import ProfilePicture from '@components/settings/ProfilePicture'
import GreenDotIcon from '@components/common/icons/GreenDotIcon'
import WhiteDotIcon from '@components/common/icons/WhiteDotIcon'
import { useState } from 'react'
import Image from 'next/image'
import { IBook } from '@customTypes/bookType'
import { Post } from '@components/home/Post'
import { Button } from '@components/common/Button'

const TABS = {
  FAVORITES: 'Favorites',
  READ: 'Read',
  POSTS: 'Posts',
}

const Profile = () => {
  const [currentTab, setCurrentTab] = useState(TABS.FAVORITES)
  const { data: session } = useSession()

  if (session === undefined) return <></>
  if (session === null) return <></>

  const handleTabClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const buttonElement = e.target as HTMLButtonElement
    if (buttonElement) setCurrentTab(buttonElement.value)
  }

  const lists = session.user.lists as Record<
    string,
    { color: string; books: IBook[] }
  >

  return (
    <div className="w-full">
      {/* Profile Banner */}
      <div className="xl:px-6 xl:pt-6">
        <div className="relative w-full h-[134px] overflow-hidden xl:h-[272px] xl:rounded-[8px]">
          <Image
            src="/tempBannerImage.png"
            alt=""
            width="390"
            height="134"
            style={{
              width: '100%',
              objectFit: 'cover',
            }}
          />
          {/* Banner Overlay */}
          <div className="absolute top-0 h-full w-full bg-gradient-to-r from-black opacity-90 hidden xl:block"></div>
          <div className="absolute top-0 h-full w-full bg-gradient-to-t from-black opacity-70 hidden xl:block"></div>
        </div>
      </div>

      {/* User Profile Pic */}
      <div className="relative flex justify-center mt-[-50px] xl:mt-[-145px] xl:justify-start xl:px-14 xl:gap-7">
        <ProfilePicture className="xl:w-[186px] xl:h-[186px] xl:border-[6px]" />

        {/* Desktop User Details */}
        <div className="hidden text-[#F9FBFC] justify-center gap-3 xl:flex xl:flex-col ">
          <h1 className="font-lora font-bold text-[32px] leading-[28px]">
            {`${session.user.firstName} ${session.user.lastName}`}
          </h1>
          <div className="flex items-center gap-2 font-montserrat font-medium text-xl">
            <p>
              <span className="font-bold">0</span>
              <span className="font-medium">&nbsp;Followers</span>
            </p>
            <WhiteDotIcon />
            <p>
              <span className="font-bold">0</span>
              <span className="font-medium">&nbsp;Following</span>
            </p>
          </div>
        </div>
      </div>

      {/* Mobile User Details */}
      <div className="flex flex-col items-center mt-4 xl:hidden">
        <h1 className="font-lora font-bold text-xl text-primary leading-[28px]">
          {`${session.user.firstName} ${session.user.lastName}`}
        </h1>
        <div className="flex items-center gap-2 font-montserrat font-medium text-[14px] text-primary">
          <p>
            <span className="font-bold">0</span>
            &nbsp;Followers
          </p>
          <GreenDotIcon />
          <p>
            <span className="font-bold">0</span>
            &nbsp;Following
          </p>
        </div>

        {/* Tabs */}
        <div className="w-full mt-10 border-b-2 border-b-[#DFE7EB]">
          <div className="relative bottom-[-2px] flex w-full justify-center gap-8 font-montserrat font-semibold text-[14px] text-primary ">
            <button
              className={
                currentTab === TABS.FAVORITES
                  ? 'pb-3 border-b-primary border-b-2'
                  : 'pb-3 border-b-[#DFE7EB] border-b-2'
              }
              onClick={(e) => handleTabClick(e)}
              value={TABS.FAVORITES}
            >
              {TABS.FAVORITES}
            </button>
            <button
              className={
                currentTab === TABS.READ
                  ? 'pb-3 border-b-primary border-b-2'
                  : 'pb-3 border-b-[#DFE7EB] border-b-2'
              }
              onClick={handleTabClick}
              value={TABS.READ}
            >
              {TABS.READ}
            </button>
            <button
              className={
                currentTab === TABS.POSTS
                  ? 'pb-3 border-b-primary border-b-2'
                  : 'pb-3 border-b-[#DFE7EB] border-b-2'
              }
              onClick={handleTabClick}
              value={TABS.POSTS}
            >
              {TABS.POSTS}
            </button>
          </div>
        </div>
      </div>

      {/* Lists for: Favorites, Read, and Posts */}
      <div className="px-3">
        {currentTab === TABS.FAVORITES && <>Coming Soon</>}
        {currentTab === TABS.READ && (
          <p>{lists['Read'].books.length} Books Read</p>
        )}
        {currentTab === TABS.POSTS && (
          <>
            <Button
              type="primary"
              bordersRounded={true}
              clickHandler={() => {}}
              className="w-full justify-center mt-8"
            >
              Create New Post
            </Button>
            <Post />
            <Post />
            <Post />
          </>
        )}
      </div>
    </div>
  )
}

export default Profile
