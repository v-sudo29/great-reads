'use client'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Nav() {
  const { data: session } = useSession()
  const router = useRouter()

  if (session && session.user) {
    return (
      <nav className="flex w-screen justify-between border border-red-600 p-5">
        <div
          className='cursor-pointer border border-red-800'
          onClick={() => router.replace('/')} 
        >
          Logo
        </div>
        <p>{session.user.name}</p>
        <button onClick={() => signOut()}>
          Sign Out
        </button>
      </nav>
    )
  }

  return (
    <nav className="flex w-screen justify-between border border-red-600 p-5">
      <div
        className='cursor-pointer border border-red-800'
        onClick={() => router.replace('/')} 
      >
        Logo
      </div>
      <button onClick={() => router.replace('/api/auth/sign-in')}>
        Sign In
      </button>
    </nav>
  )
}
