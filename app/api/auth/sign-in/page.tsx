'use client'

import { ChangeEventHandler, FormEventHandler, useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from 'next-auth/react'
import { GoogleButton } from "@components/authButtons"

const SignIn = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  })

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

  return (
    <div className='w-1/3'>
      <form className='p-6 flex flex-col gap-4 w-full shadow-xl rounded-md' onSubmit={handleSubmit}>
        <div>
          <h1 className='text-2xl font-semibold'>Welcome back</h1>
          <span className='text-sm font-normal'>Please log into your account</span>
        </div>
        {error.length > 0 ? (
            <div className='text-red-500 font-sm'>
              <h1>{error}</h1>
            </div>
          ) : null}
        <div>
          <label className='text_field_label' htmlFor="email" >Email</label>
          <input
            className="text_field"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className='text_field_label' htmlFor="password">Password</label>
          <input
            className="text_field"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            autoComplete="on"
          />
        </div>

        <button
          className="sign_in_button bg-blue-950 text-white hover:bg-blue-1000 transition-all"
          type="submit"
          disabled={loading}
          style={{ opacity: loading ? 0.5 : 1 }}
        >
          Sign In
        </button>

        <div 
          className="flex text-center px-2 items-center 
            before:flex-1 before:border-slate-300 before:border-b
            after:flex-1 after:border-black-slate-300 after:border-b"
          >
          <span className='mx-2 text-sm text-slate-300'>OR</span>
        </div>
        <div>
          <GoogleButton loading={loading}/>
        </div>
      </form>
    </div>
  )
}

export default SignIn