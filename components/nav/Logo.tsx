'use client'
import { useRouter } from 'next/navigation'

const Logo = () => {
  const router = useRouter()
  return (
    <div
      className='cursor-pointer'
      onClick={() => router.replace('/')} 
    >
    Logo
  </div>
  )
}

export default Logo