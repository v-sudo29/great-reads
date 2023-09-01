'use client'
import { useSession } from "next-auth/react"

const Lists = () => {
  const { data: session } = useSession()
  console.log(session)
  return (
    <div>
      <h1 className='page_heading'>Lists</h1>
      
    </div>
  )
}

export default Lists