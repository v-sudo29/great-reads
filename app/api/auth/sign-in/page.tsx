'use client'

import { ChangeEventHandler, FormEventHandler, useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from 'next-auth/react'

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
    router.replace('/')
    
  }

  return (
    <div>
      <form className='p-5' onSubmit={handleSubmit}>
        {error.length > 0 ? (
            <div>
              <h1>{error}</h1>
            </div>
          ) : null}
        <div>
          <label htmlFor="email" >Email</label>
          <input
            className="flex flex-col h-5 border border-slate-400 rounded-sm"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            className="flex flex-col h-5 border border-slate-400 rounded-sm"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>

        <button
          className="bg-sky-500 text-white px-2 py-1 my-2 rounded-md hover:bg-sky-700 transition-all"
          type="submit"
          disabled={loading}
          style={{ opacity: loading ? 0.5 : 1 }}
        >
          Sign In
        </button>
      </form>
    </div>
  )
}

export default SignIn