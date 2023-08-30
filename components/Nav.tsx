'use client'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Nav() {
  const { data: session } = useSession()
  const router = useRouter()
  console.log(session)
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
      <div className='flex gap-5'>
        <button className='font-semibold hover:text-gray-400 transition-all' onClick={() => router.replace('/api/auth/sign-up')}>Sign Up</button>
        <button
          className='bg-blue-950 px-9 py-2 text-white rounded-full font-semibold hover:bg-blue-1000 transition-all'
          onClick={() => router.replace('/api/auth/sign-in')}
        >
          Sign In
        </button>
      </div>
    </nav>
  )
}
