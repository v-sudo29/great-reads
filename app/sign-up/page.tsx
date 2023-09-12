'use client'
import { GoogleButton } from "@components/authButtons"
import Separator from "@components/Separator"
import SignUpForm from "@components/sign-up/SignUpForm"
import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

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
  if (session === null) return (
    <div className='flex flex-col gap-4 p-6 w-1/3 shadow-xl rounded-md'>
      <SignUpForm/>
      <Separator/>
      <GoogleButton text={'Sign up with Google'}/>
    </div>
  )

  if (session) return <></>
  return <></>
}

export default SignUp