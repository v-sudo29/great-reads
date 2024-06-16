'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import SignInModal from '@components/sign-in/SignInModal'
import Overlay from '@components/common/Overlay'
import Home from '@app/page'

const SignIn = () => {
  const { data: session } = useSession()
  const router = useRouter()

  // If session exists, redirect user to their feed
  useEffect(() => {
    if (session) router.replace('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  // Show nothing if session is undefined
  if (session === undefined) return <></>

  // Show login form if user is not authenticated
  if (session === null)
    return (
      <>
        <Overlay isOpen={true} handleClose={() => {}} />
        <div className="flex relative w-full min-w-full h-full justify-center px-4">
          <div className="pointer-events-none flex justify-center w-full">
            <Home />
          </div>
          <SignInModal />
        </div>
      </>
    )

  if (session) return <></>
  return <></>
}

export default SignIn
