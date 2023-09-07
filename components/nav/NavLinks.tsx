'use client'
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useUser } from "@context/userContext"

const NavLinks = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const { imageUrl, loading } = useUser()

  return (
    <div className='flex gap-5 justify-center items-center'>
      {(session && !loading) && (
        <>
          <Link href='/friends'>Friends</Link>
          <Link href='/feed'>Feed</Link>
          <Link href='/lists'>Lists</Link>
          <div className='flex flex-col items-center'>
            <Link href='/profile'>
              <Image
                src={
                  // If user has imageName -- display imageUrl
                  (session.user.imageName && imageUrl) ? `${imageUrl}` :
                  // Else if user has defaultImage -- display defaultImage
                    session.user.defaultImage ? `${session.user.defaultImage}` :
                  // Else if user has none, display default profile pic
                     '/../default-profile-pic.svg'
                }
                priority={true}
                alt='Profile picture'
                width={35}
                height={35}
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