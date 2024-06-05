'use client'

import { useState } from 'react'
import Logo from './Logo'
import NavLinks from './NavLinks'

const HamburgerIcon = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 12H18" stroke="#53675D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 6H20" stroke="#53675D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 18H20" stroke="#53675D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

const MobileSidebar = () => {
  return (
    <div className='fixed min-w-[318px] self-start min-h-screen bg-[#F9FBFC] border border-r-[#DFE7EB]'> 

    </div>
  )
}

interface OverlayProps {
  setIsMobileSidebarOpen : React.Dispatch<React.SetStateAction<boolean>>
}

const Overlay = ({ setIsMobileSidebarOpen } : OverlayProps) => {
  const handleOverlayClick = () => setIsMobileSidebarOpen(false)
  
  return (
    <div
      className='fixed w-full min-h-screen bg-black opacity-30'
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
      <nav className="h-[3.5rem] flex w-screen items-center justify-between px-5 py-3 border border-b-[#DFE7EB]">
        <div
          className='cursor-pointer'
          onClick={handleHamburgerIconClick}
          >
          <HamburgerIcon />
        </div>
        <Logo />
      </nav>
      {isMobileSidebarOpen && (
        <>  
          <Overlay
            setIsMobileSidebarOpen={setIsMobileSidebarOpen}
          />
          <MobileSidebar />
        </>
      )}
    </>
  )
}
