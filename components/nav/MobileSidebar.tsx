import { ReactNode } from "react"
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

const LineDivider = () => <div className='w-full border-b pt-4 mb-4'></div>

const MobileSidebar = ({
  isMobileSidebarOpen
} : {
  isMobileSidebarOpen: boolean
}) => {
  const { data: session } = useSession()
  const numberOfLists = Object.keys(session?.user?.lists ?? {}).length
  const sidebarStyles = isMobileSidebarOpen ? '' : 'transform translate-x-[-381px]'
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
                icon={<ExploreIcon/>}
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
          <a href='/sign-in'>
            <PlusIcon/>
          </a>
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
  )
}

export default MobileSidebar