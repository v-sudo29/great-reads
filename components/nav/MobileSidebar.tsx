import Logo from "./Logo"
import { ButtonLink } from "@components/common/Button"
import HomeIcon from "../common/icons/HomeIcon"
import PlusIcon from "../common/icons/PlusIcon"
import ProfileIcon from "../common/icons/ProfileIcon"
import { useSession } from 'next-auth/react'
import ExploreIcon from "@components/common/icons/ExploreIcon"
import SettingsIcon from "@components/common/icons/SettingsIcon"
import { IBook } from "@customTypes/bookType"
import SidebarNavLink from "./SidebarNavLink"
import { useState } from "react"
import CreateListModal from "./CreateListModal"
import Overlay from "@components/common/Overlay"

interface MobileSidebarProps {
  isMobileSidebarOpen: boolean
  handleMobileSidebarClose: () => void
}

const LineDivider = () => <div className='w-full border-b pt-4 mb-4'></div>

const MobileSidebar = ({
  isMobileSidebarOpen,
  handleMobileSidebarClose
} : MobileSidebarProps) => {
  const [isListModalOpen, setIsListModalOpen] = useState(false)
  const { data: session } = useSession()
  const numberOfLists = Object.keys(session?.user?.lists ?? {}).length
  const sidebarStyles = isMobileSidebarOpen ? '' : 'transform translate-x-[-381px]'
  let listLinks: JSX.Element[]| [] = []

  const handleListModalOpen = () => setIsListModalOpen(true)
  const handleListModalClose = () => setIsListModalOpen(false)

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
    {isListModalOpen && (
      <div className='absolute w-full h-full z-[10]'>
        <CreateListModal
          handleListModalClose={handleListModalClose}
        />
        <Overlay
          isOpen={isListModalOpen}
          handleClose={handleListModalClose}
        />
      </div>
    )}
    <div className={sidebarStyles + ' ' + 'fixed z-50 w-full max-w-[366px] self-start min-h-screen bg-[#F9FBFC] border-r border-r-[#DFE7EB] transition-transform duration-200 ease-out'}>
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
                onClick={handleMobileSidebarClose}
              >
                Home
              </SidebarNavLink>
            </li>
            <li>
              <SidebarNavLink
                href='/profile'
                icon={<ProfileIcon />}
                onClick={handleMobileSidebarClose}
              >
                My Profile
              </SidebarNavLink>
            </li>
            <li>
              <SidebarNavLink
                href='/friends'
                icon={<ExploreIcon/>}
                onClick={handleMobileSidebarClose}
              >
                Explore
              </SidebarNavLink>
            </li>
            <li>
              <SidebarNavLink
                href={session === null ? '/sign-in' : '/settings'}
                icon={<SettingsIcon/>}
                onClick={handleMobileSidebarClose}
              >
                Settings
              </SidebarNavLink>
            </li>
          </ul>
        </nav>
        <LineDivider />
        <div className='flex items-center justify-between px-3 py-3'>
          <div className='flex gap-2 font-montserrat font-bold'>
            <p className='text-primary'>
              My Lists
            </p>
            {session && (
              <span className='flex items-center w-8 h-[22px] text-white bg-primary rounded-[60px] px-3 py-[1px] text-[12px]'>
                {numberOfLists}
              </span>
            )}
          </div>
          <button onClick={() => {
            handleListModalOpen()
            handleMobileSidebarClose()
          }}>
            <PlusIcon/>
          </button>
        </div>
        {session && listLinks}
        {!session && (
          <>
            <p className='font-montserrat text-[14px] text-primary font-medium px-3 py-2 leading-[32px] tracking-[-0.5px] mt-2'>
              Sign in to add books to your list!
            </p>
            <div className='flex flex-col gap-2 mt-2'>
              <ButtonLink
                href='/sign-in'
                type='primary'
                bordersRounded={true}
                className='flex w-full justify-center'
              >
                Sign In
              </ButtonLink>
              <ButtonLink
                href='/sign-up'
                type='secondary'
                bordersRounded={true}
                className='flex w-full justify-center'
              >
                Create Account
              </ButtonLink>
            </div>
          </>
        )}
      </div>
    </div>
    </>
  )
}

export default MobileSidebar