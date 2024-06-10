'use client'

import { useState } from 'react'
import MobileSidebar from './MobileSidebar'
import SidebarNavLink from './SidebarNavLink'
import Overlay from '@components/common/Overlay'
import Logo from './Logo'
import HamburgerIcon from '../common/icons/HamburgerIcon'
import HomeIcon from '@components/common/icons/HomeIcon'
import ProfileIcon from '@components/common/icons/ProfileIcon'
import FriendsListIcon from '@components/common/icons/FriendsListIcon'
import PlusIcon from '@components/common/icons/PlusIcon'
import SettingsIcon from '@components/common/icons/SettingsIcon'
import { useSession, signOut } from 'next-auth/react'

const LineDivider = () => <div className='w-full border-b pt-4 mb-4'></div>

export default function Nav() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const { data: session } = useSession()

  const handleHamburgerIconClick = () => setIsMobileSidebarOpen(true)
  const handleOverlayClose = () => setIsMobileSidebarOpen(false)

  if (session === undefined) return <></>
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
                    href='/friends'
                    icon={<FriendsListIcon />}
                  >
                    Friends List
                  </SidebarNavLink>
                </li>
              </ul>
            </nav>
            <LineDivider />
            <div className='flex items-center justify-between px-3 py-3'>
              <div className='flex gap-2 font-montserrat font-bold'>
                <p className='text-primary xl:text-[18px]'>
                  My Lists
                </p>
                {/* TODO: Uncomment when implementing session check logic */}
                {/* <span className='flex items-center w-8 text-white bg-primary rounded-[60px] px-3 py-[1px] text-[12px]'>3</span> */}
              </div>
              <a href='/sign-in'>
                <PlusIcon/>
              </a>
            </div>
            {session === null && (
              <p className='font-montserrat text-[14px] text-primary font-medium px-3 py-2 leading-[32px] tracking-[-0.5px] mt-2 xl:text-[18px]'>
                Sign in to add books to your list!
              </p>
            )}
            <ul className='mt-auto'>
              {session && (
                <li>
                  <button onClick={() => signOut()}>
                    Sign Out
                  </button>
                </li>
              )}
              <li>
                <SidebarNavLink
                  href={session === null ? '/sign-in' : '/settings'} // TODO: update to setting once settings page is implemented
                  icon={<SettingsIcon/>}
                >
                  Settings
                </SidebarNavLink>
              </li>
            </ul>
          </div>
        </div>
        
      </div>
      <Overlay
        isOpen={isMobileSidebarOpen}
        handleClose={handleOverlayClose}
      />
      <MobileSidebar
        isMobileSidebarOpen={isMobileSidebarOpen}
      />
    </>
  )
}
