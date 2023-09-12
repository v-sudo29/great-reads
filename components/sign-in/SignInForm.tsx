'use client'
import { signIn } from 'next-auth/react'
import { FormEventHandler, useRef, useState } from 'react'

const SignInForm = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

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
        setError(res.error)
      } else setLoading(false)
    } 
  }
  return (
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
      <div>
        <label className='text_field_label' htmlFor="email" >Email</label>
        <input
          ref={emailRef}
          className="text_field"
          type="email"
          name="email"
        />
      </div>
      <div>
        <label className='text_field_label' htmlFor="password">Password</label>
        <input
          ref={passwordRef}
          className="text_field"
          type="password"
          name="password"
          autoComplete="on"
        />
      </div>
      <button
        className="form_submit_button"
        type="submit"
        disabled={loading}
        style={{ opacity: loading ? 0.5 : 1 }}
      >
        Sign In
      </button>
    </form>
  )
}

export default SignInForm