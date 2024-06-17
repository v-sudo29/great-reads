'use client'
import SignUpModal from '@components/sign-up/SignUpModal'
import Home from '@app/page'
import Overlay from '@components/common/Overlay'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const SignUp = () => {
  const { data: session } = useSession()
  const router = useRouter()

  // If session exists, redirect user to their feed
  useEffect(() => {
    if (session) router.replace('/feed')
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
          <div className="z-10">
            <SignUpModal />
          </div>
        </div>
      </>
    )

  if (session) return <></>
  return <></>
}

export default SignUp
