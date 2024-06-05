import Logo from './Logo'
import NavLinks from './NavLinks'

const HamburgerNav = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 12H18" stroke="#53675D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 6H20" stroke="#53675D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 18H20" stroke="#53675D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function Nav() {
  return (
    <nav className="h-[3.5rem] flex w-screen items-center justify-between px-5 py-3 border border-b-[#DFE7EB]">
      <HamburgerNav />
      <Logo />
    </nav>
  )
}
