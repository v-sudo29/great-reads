'use client'

import { useState } from 'react'
import MobileSidebar from './MobileSidebar'
import SidebarNavLink from './SidebarNavLink'
import Overlay from '@components/common/Overlay'
import Logo from './Logo'
import HamburgerIcon from '../common/icons/HamburgerIcon'
import HomeIcon from '@components/common/icons/HomeIcon'
import ProfileIcon from '@components/common/icons/ProfileIcon'
import PlusIcon from '@components/common/icons/PlusIcon'
import SettingsIcon from '@components/common/icons/SettingsIcon'
import { useSession } from 'next-auth/react'
import ExploreIcon from '@components/common/icons/ExploreIcon'
import { IBook } from '@customTypes/bookType'
import CreateListModal from './CreateListModal'

const LineDivider = () => <div className='w-full border-b pt-4 mb-4'></div>

export default function Nav() {
  const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const { data: session } = useSession()
  const numberOfLists = Object.keys(session?.user?.lists ?? {}).length

  const handleHamburgerIconClick = () => setIsMobileSidebarOpen(true)
  const handleMobileSidebarClose = () => setIsMobileSidebarOpen(false)

  const handleListModalOpen = () => setIsCreateListModalOpen(true)
  const handleListModalClose = () => setIsCreateListModalOpen(false)

  if (session === undefined) return <></>

  let listLinks: JSX.Element[]| [] = []

  if (session) {
    for (let listName in session.user.lists) {
      const listsCopy = session.user.lists as Record<string, {
        color: string;
        books: IBook[];
      }>
      (listLinks as JSX.Element[]).push(
        <SidebarNavLink
          key={`${listName}-list`}
          href='/'
          icon={
            <div
              className='flex w-[14px] h-[14px] rounded-[2px]'
              style={{ backgroundColor: `#${listsCopy[listName].color}`}}
            ></div>
          }
          className='gap-2'
        >
          {listName}
        </SidebarNavLink>
      )
    }
  }
  return (
    <>
      {/* Mobile Nav */}
      <nav className='relative h-[3.5rem] flex w-screen items-center justify-between px-5 py-3 border-b border-b-[#DFE7EB] xl:hidden'>
        <div
          className='cursor-pointer'
          onClick={handleHamburgerIconClick}
        >
          <HamburgerIcon />
        </div>
        <Logo />
      </nav>

      {/* Desktop Sidebar Nav */}
      <div className='hidden xl:relative xl:block'>
        <div className='min-w-[400px] self-start min-h-screen bg-[#FFFFFF] border-r border-r-[#DFE7EB] transition-transform duration-200 ease-out xl:flex xl:flex-col'>
          <div className='h-[3.5rem] mx-6 px-2 pt-6 pb-8'>
            <Logo />
          </div>
          <div className='px-6 py-8 flex-auto flex flex-col'>
            <nav>
              <ul className='xl:flex xl:flex-col xl:gap-2'>
                <li>
                  <SidebarNavLink
                    href='/'
                    icon={<HomeIcon />}
                  >
                    Home
                  </SidebarNavLink>
                </li>
                <li>
                  <SidebarNavLink
                    href='/profile'
                    icon={<ProfileIcon />}
                  >
                    My Profile
                  </SidebarNavLink>
                </li>
                <li>
                  <SidebarNavLink
                    href='/'
                    icon={<ExploreIcon />}
                  >
                    Explore
                  </SidebarNavLink>
                </li>
                <li>
                  <SidebarNavLink
                    href={session === null ? '/sign-in' : '/settings'}
                    icon={<SettingsIcon/>}
                  >
                    Settings
                  </SidebarNavLink>
                </li>
              </ul>
            </nav>
            <LineDivider />
            <div className='flex items-center justify-between px-3 py-3'>
              <div className='flex items-center gap-2 font-montserrat font-bold'>
                <p className='text-primary xl:text-[18px]'>
                  My Lists
                </p>
                {session && (
                  <span className='flex items-center w-8 h-[22px] text-white bg-primary rounded-[60px] px-3 py-[1px] text-[12px]'>
                    {numberOfLists}
                  </span>
                )}
              </div>
              {session && (
                <button onClick={handleListModalOpen}>
                  <PlusIcon/>
                </button>
              )}
            </div>
            {session && (
              <div className='mt-2'>
                {listLinks}
              </div>
            )}
            {session === null && (
              <p className='font-montserrat text-[14px] text-primary font-medium px-3 py-2 leading-[32px] tracking-[-0.5px] mt-2 xl:text-[18px]'>
                Sign in to add books to your list!
              </p>
            )}
          </div>
        </div>
        
      </div>
      <Overlay
        isOpen={isMobileSidebarOpen}
        handleClose={handleMobileSidebarClose}
      />
      <MobileSidebar
        isMobileSidebarOpen={isMobileSidebarOpen}
        handleMobileSidebarClose={handleMobileSidebarClose}
        handleCreateListModalOpen={handleListModalOpen}
      />
      {isCreateListModalOpen && (
        <div className='absolute w-full h-full z-[10]'>
          <CreateListModal
            handleListModalClose={handleListModalClose}
          />
          <Overlay
            isOpen={isCreateListModalOpen}
            handleClose={handleListModalClose}
          />
        </div>
      )}
    </>
  )
}
