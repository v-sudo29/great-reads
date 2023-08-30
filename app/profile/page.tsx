'use client'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const Profile = () => {
  const { data: session } = useSession()
  const router = useRouter()
  
  useEffect(() => {
    if (session === null) router.push('/')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  if (session === undefined) return <></>
  if (session) return (
    <div>This is my profile!</div>
  )
  return <></>
}

export default Profile