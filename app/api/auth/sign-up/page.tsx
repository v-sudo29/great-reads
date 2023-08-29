'use client'

import Link from "next/link"
import { ChangeEventHandler, FormEventHandler, useState } from "react"

const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: ''
  })
  const { name, email, password } = userInfo
  
  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target

    setUserInfo({ ...userInfo, [name]: value })
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/auth/users', {
      method: 'POST',
      body: JSON.stringify(userInfo),
    }).then(res => res.json()).catch(error => console.error(error))
    console.log(res)
  }
  return (
    <div className='flex flex-col items-center shadow-md my-5'>
      <form className='p-5' onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            className="flex flex-col h-5 border border-slate-400 rounded-sm"
            type="text" 
            name="name" 
            value={name}
            onChange={handleChange}
          />
        </div>

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
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default SignUp