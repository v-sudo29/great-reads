'use client'
import { useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { GoogleButton } from '@components/authButtons'
import Separator from '@components/Separator'
import SignInModal from '@components/sign-in/SignInModal'

const SignIn = () => {
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
  if (session === null) return (
    <SignInModal/>
  )

  if (session) return <></>
  return <></>
}

export default SignIn