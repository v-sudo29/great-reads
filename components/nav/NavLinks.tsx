'use client'
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

const NavLinks = () => {
  const router = useRouter()
  const { data: session } = useSession()

  return (
    <div className='flex gap-5 justify-center items-center'>
      {(session && session.user) && (
        <>
          <Link href='/feed'>Feed</Link>
          <div className='flex flex-col items-center'>
            <Link href='/profile'>
              <Image
                src={session.user?.image ? `${session.user?.image}` : '/../default-profile-pic.svg'}
                priority={true}
                alt='Profile picture'
                width={35}
                height={0}
              />
            </Link> 
          </div>
             
          <button onClick={() => signOut()}>
            Sign Out
          </button>
        </>
      )}
      {(session === null) && (
        <>
          <button
            className='font-semibold hover:text-gray-400 transition-all'
            onClick={() => router.replace('/api/auth/sign-up')}
          >
            Sign Up
          </button>
          <button
            className='bg-blue-950 px-9 py-2 text-white rounded-full font-semibold hover:bg-blue-1000 transition-all'
            onClick={() => router.replace('/api/auth/sign-in')}
          >
            Sign In
          </button>
        </>
      )}
    </div>
  )
}

export default NavLinks