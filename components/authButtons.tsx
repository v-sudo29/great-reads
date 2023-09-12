'use client'

import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import { useState } from "react"

export const GoogleButton = ({ text } : { text: string }) => {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    await signIn('google', { redirect: true, callbackUrl: 'http://localhost:3000/' })
    setLoading(false)
  }

  return (
    <button
      onClick={handleClick}
      className='rounded-md py-2 my-2 w-full text-sm flex justify-center items-center gap-2 border border-slate-300
        hover:border-blue-950 transition-all'
      disabled={loading}
      style={{ opacity: loading ? 0.5 : 1 }}
    >
      <FcGoogle size={21}/>
      <p>{text}</p>
    </button>
  )
}