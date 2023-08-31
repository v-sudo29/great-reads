'use client'
import Logo from './Logo'
import NavLinks from './NavLinks'

export default function Nav() {
  return (
    <nav style={{ height: '5.5rem' }} className="shadow-md flex w-screen items-center justify-between p-5">
      <Logo/>
      <NavLinks/>
    </nav>
  )
}
