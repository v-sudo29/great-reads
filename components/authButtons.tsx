'use client'

import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import { ReactNode, useState } from "react"

export const GoogleButton = ({ children } : { children: ReactNode }) => {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    await signIn('google', {
      redirect: true,
      callbackUrl: '/' })
    setLoading(false)
  }

  return (
    <button
      onClick={handleClick}
      className='rounded-md py-3 w-full h-12 font-semibold text-primary flex justify-center items-center gap-2 border border-[#D0D5DD]
        hover:border-blue-950 transition-all'
      disabled={loading}
      style={{ opacity: loading ? 0.5 : 1 }}
    >
      <FcGoogle size={21}/>
      <p>{children}</p>
    </button>
  )
}