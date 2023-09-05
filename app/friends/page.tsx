'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { IOtherUser } from '@/types/userTypes'

interface FetchUsersType {
  users: IOtherUser[]
}

const Friends = () => {
  const [usersData, setUsersData] = useState<IOtherUser[] | null>(null)
  const { data: session } = useSession()
  let potentialCards: (JSX.Element | null)[] | null = null

  console.log(session?.user)
  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/auth/users/')
      const data: FetchUsersType = await res.json()
      setUsersData(data.users)
    } catch (error) {
      console.log(error)
    } 
  }

  // Fetch all users
  useEffect(() => {
    if (!usersData) fetchUsers()
  }, [])

  // Display potential friends UI to to user
  if (usersData) {
    potentialCards = usersData.map(user => {
      if (user.id === session?.user.id) return null
      return (
        <div key={`${user.id}-potential-friend`} className='border'>
          <h1>{user.name}</h1>
        </div>
      )
    })
  }

  return (
    <div>
      <h1 className='page_heading'>Friends</h1>
      <button className='general_button' onClick={fetchUsers}>Fetch Users</button>
      <div>
        {potentialCards && potentialCards}
      </div>
    </div>
  )
}

export default Friends