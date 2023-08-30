'use client'
import Logo from './Logo'
import NavLinks from './NavLinks'

export default function Nav() {
  return (
    <nav style={{ height: '5.5rem' }} className="flex w-screen items-center justify-between border border-red-600 p-5">
      <Logo/>
      <NavLinks/>
    </nav>
  )
}
