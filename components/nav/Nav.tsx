'use client'

import { ReactNode, useState } from 'react'
import Logo from './Logo'
import HomeIcon from './icons/HomeIcon'
import ProfileIcon from './icons/ProfileIcon'
import FriendsListIcon from './icons/FriendsListIcon'
import HamburgerIcon from './icons/HamburgerIcon'
import PlusIcon from './icons/PlusIcon'
import ButtonLink from '@components/common/ButtonLink'

interface SidebarNavLinkProps {
  href: string
  children: ReactNode
  icon: ReactNode
}

const SidebarNavLink = ({
  href,
  children,
  icon
} : SidebarNavLinkProps) => {
  return (
    <a
      className='flex items-center gap-4 h-[52px] px-3 text-primary font-montserrat text-[14px] font-medium rounded-[4px] hover:bg-[#F0F4F6] hover:font-semibold'
      href={href}
    >
      <div className='w-6 h-6'>
        {icon}
      </div>
      {children}
    </a>
  )
}

const MobileSidebar = ({ isMobileSidebarOpen } : { isMobileSidebarOpen: boolean }) => {
  const sidebarStyles = isMobileSidebarOpen ? '' : 'transform translate-x-[-381px]'
  return (
    <div className={sidebarStyles + ' ' + 'fixed min-w-[318px] self-start min-h-screen bg-[#F9FBFC] border-r border-r-[#DFE7EB] transition-transform duration-200 ease-out'}>
      <div className='h-[3.5rem] px-5 py-3 border-b border-b-[#DFE7EB]'>
        <Logo />
      </div>
      <div className='px-3 py-4'>
        <nav>
          <ul>
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
        {/* LINE DIVIDER */}
        <div className='w-full border-b pt-4 mb-4'></div>
        <div className='flex items-center justify-between px-3 py-3'>
          <div className='flex gap-2 font-montserrat font-bold'>
            <p className='text-primary'>My Lists</p>
            <span className='flex items-center w-8 text-white bg-primary rounded-[60px] px-3 py-[1px] text-[12px]'>3</span>
          </div>
          <div>
            <PlusIcon/>
          </div>
        </div>
        <p className='font-montserrat text-[14px] text-primary font-medium px-3 py-2 leading-[32px] tracking-[-0.5px] mt-2'>
          Sign in to add books to your list!
        </p>
        <div className='flex flex-col gap-2 mt-2'>
          <ButtonLink
            href='/'
            type='primary'
            bordersRounded={true}
            className='flex w-full justify-center'
          >
            Sign In
          </ButtonLink>
          <ButtonLink
            href='/'
            type='secondary'
            bordersRounded={true}
            className='flex w-full justify-center'
          >
            Create Account
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}

interface OverlayProps {
  isMobileSidebarOpen: boolean
  setIsMobileSidebarOpen : React.Dispatch<React.SetStateAction<boolean>>
}

const Overlay = ({
  isMobileSidebarOpen,
  setIsMobileSidebarOpen
} : OverlayProps) => {
  const overlayActiveStyles = isMobileSidebarOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'
  const handleOverlayClick = () => setIsMobileSidebarOpen(false)
  return (
    <div
      className={overlayActiveStyles + ' ' + 'fixed w-full min-h-screen bg-black transition-opacity'}
      onClick={handleOverlayClick}
    >
    </div>
  )
}

export default function Nav() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const handleHamburgerIconClick = () => setIsMobileSidebarOpen(true)
  
  return (
    <>
      <nav className="h-[3.5rem] flex w-screen items-center justify-between px-5 py-3 border-b border-b-[#DFE7EB]">
        <div
          className='cursor-pointer'
          onClick={handleHamburgerIconClick}
          >
          <HamburgerIcon />
        </div>
        <Logo />
      </nav>
      <Overlay
        isMobileSidebarOpen={isMobileSidebarOpen}
        setIsMobileSidebarOpen={setIsMobileSidebarOpen}
      />
      <MobileSidebar
        isMobileSidebarOpen={isMobileSidebarOpen}
      />
    </>
  )
}
