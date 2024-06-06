'use client'

import { useState } from 'react'
import MobileSidebar from './MobileSidebar'
import Overlay from '@components/common/Overlay'
import Logo from './Logo'
import HamburgerIcon from '../common/icons/HamburgerIcon'

export default function Nav() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const handleHamburgerIconClick = () => setIsMobileSidebarOpen(true)
  const handleOverlayClose = () => setIsMobileSidebarOpen(false)
  
  return (
    <>
      <nav className="relative h-[3.5rem] flex w-screen items-center justify-between px-5 py-3 border-b border-b-[#DFE7EB]">
        <div
          className='cursor-pointer'
          onClick={handleHamburgerIconClick}
        >
          <HamburgerIcon />
        </div>
        <Logo />
      </nav>
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
