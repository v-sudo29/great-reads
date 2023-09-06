'use client'
import { FormEventHandler, useState , useRef, useEffect} from "react"
import { useRouter } from "next/navigation"
import { signIn, useSession } from 'next-auth/react'
import { GoogleButton } from "@components/form/authButtons"
import EmailInput from "@components/form/EmailInput"
import PasswordInput from "@components/form/PasswordInput"
import SignInButton from "@components/form/SignInButton"
import Separator from "@components/form/Separator"

const SignIn = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const { data: session } = useSession()
  const router = useRouter()

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    setLoading(true)
    e.preventDefault()
    
    if (emailRef.current && passwordRef.current) {
      const email = emailRef.current.value
      const password = passwordRef.current.value
      
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (res?.error) {
        setLoading(false)
        // Set error text if credentials don't match
        setError(res.error)
      } else {
        setLoading(false)
      }
    } 
  }

  useEffect(() => {
    if (session) router.replace('/feed')
  }, [session])

  // Show nothing if session is undefined
  if (session === undefined) return <></>

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
        <EmailInput emailRef={emailRef}/>
        <PasswordInput passwordRef={passwordRef} />
        <SignInButton loading={loading} />
      </form>
      <Separator/>
      <div>
        <GoogleButton loading={loading} text={'Sign in with Google'}/>
      </div>
    </div>
  )
}

export default SignIn