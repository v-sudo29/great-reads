import { ReactNode } from "react"
import Logo from "./Logo"
import ButtonLink from "@components/common/ButtonLink"
import FriendsListIcon from "../common/icons/FriendsListIcon"
import HomeIcon from "../common/icons/HomeIcon"
import PlusIcon from "../common/icons/PlusIcon"
import ProfileIcon from "../common/icons/ProfileIcon"

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

const LineDivider = () => <div className='w-full border-b pt-4 mb-4'></div>

const MobileSidebar = ({
  isMobileSidebarOpen
} : {
  isMobileSidebarOpen: boolean
}) => {
  const sidebarStyles = isMobileSidebarOpen ? '' : 'transform translate-x-[-381px]'
  return (
    <div className={sidebarStyles + ' ' + 'fixed w-full max-w-[366px] self-start min-h-screen bg-[#F9FBFC] border-r border-r-[#DFE7EB] transition-transform duration-200 ease-out'}>
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
        <LineDivider />
        <div className='flex items-center justify-between px-3 py-3'>
          <div className='flex gap-2 font-montserrat font-bold'>
            <p className='text-primary'>
              My Lists
            </p>
            {/* TODO: Uncomment when implementing session check logic */}
            {/* <span className='flex items-center w-8 text-white bg-primary rounded-[60px] px-3 py-[1px] text-[12px]'>3</span> */}
          </div>
          <a href='/sign-in'>
            <PlusIcon/>
          </a>
        </div>
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
      </div>
    </div>
  )
}

export default MobileSidebar