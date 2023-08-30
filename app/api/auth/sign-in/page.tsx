'use client'
import { ChangeEventHandler, FormEventHandler, useState } from "react"
import { useRouter } from "next/navigation"
import { signIn, useSession } from 'next-auth/react'
import { GoogleButton } from "@components/sign-in/authButtons"
import EmailInput from "@components/sign-in/EmailInput"
import PasswordInput from "@components/sign-in/PasswordInput"
import SignInButton from "@components/sign-in/SignInButton"
import Separator from "@components/Separator"

const SignIn = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  })

  const { data: session } = useSession()
  const { email, password } = userInfo
  const router = useRouter()

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target
    setUserInfo({...userInfo, [name]: value})
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    setLoading(true)
    e.preventDefault()

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false
    })

    if (res?.error) {
      setLoading(false)
      return setError(res.error)
    }
    // If sign-in successful, redirect to home page
    router.replace('/')
  }

  // Show nothing if session is undefined
  if (session === undefined) return <></>

  // Redirect to home page if authenticated user tries to access login modal
  if (session) router.replace('/')

  // Show login form if user is not authenticated
  if (session === null) return (
    <div className='flex flex-col gap-4 p-6 w-1/3 shadow-xl rounded-md'>
      <form className='form' onSubmit={handleSubmit}>
        <div>
          <h1 className='text-2xl font-semibold'>Welcome back</h1>
          <span className='text-sm font-normal'>Please log into your account</span>
        </div>
        {error.length > 0 && 
          <div className='text-red-500 font-sm'>
            <h1>{error}</h1>
          </div>
        }
        <EmailInput email={email} handleChange={handleChange}/>
        <PasswordInput password={password} handleChange={handleChange} />
        <SignInButton loading={loading} />
      </form>
      <Separator/>
      <div>
        <GoogleButton loading={loading}/>
      </div>
    </div>
  )
}

export default SignIn