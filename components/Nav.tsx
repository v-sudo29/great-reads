'use client'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function Nav() {
  const { data: session } = useSession()

  if (session && session.user) {
    return (
      <nav className="flex w-screen justify-between border border-red-600 p-5">
        <div>Logo</div>
        <p>{session.user.name}</p>
        <button 
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </nav>
    )
  }

  return (
    <nav className="flex w-screen justify-between border border-red-600 p-5">
      <div>Logo</div>
      <button
        onClick={() => signIn()}
      >
        Sign In
      </button>
    </nav>
  )
}
