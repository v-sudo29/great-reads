'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { IOtherUser, IUser } from '@customTypes/userTypes'
import CurrentFriendCard from '@components/friends/CurrentFriendCard'
import PotentialFriendCard from '@components/friends/PotentialFriendCard'
import { useRouter } from "next/navigation"

interface FetchUsersType {
  users: IOtherUser[]
}

interface FetchFriendsType {
  friends: IOtherUser[]
}

const Friends = () => {
  const [usersData, setUsersData] = useState<IOtherUser[] | null>(null)
  const [friendsData, setFriendsData] = useState<IOtherUser[] | null>(null)
  const [alreadyAdded, setAlreadyAdded] = useState(false)
  const { data: session, update } = useSession()
  const router = useRouter()

  let friendCards: JSX.Element[] = []
  let potentialCards: (JSX.Element | null)[] | null = null

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users/')
      const data: FetchUsersType = await res.json()
      setUsersData(data.users)
    } catch (error) {
      console.log(error)
    } 
  }

  const fetchFriends = async () => {
    try {
      const res = await fetch('/api/friends/', {
        method: 'POST',
        body: JSON.stringify({ id: session?.user.id })
      })
      const data: FetchFriendsType = await res.json()
      setFriendsData(data.friends)
    } catch (error) {
      console.log(error)
    } 
  }

  const addFriend = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const buttonElement = e.target as HTMLButtonElement
    const classesArr = buttonElement.classList.value.split(' ')
    const index = classesArr.length - 1
    const userId = classesArr[index]

    if (session) {
      const copyUser = Object.assign({}, session.user as IUser)
      
      // If friend already added, return
      if (copyUser.friends.includes(userId)) {
        setAlreadyAdded(true)
        return
      }

      copyUser.friends.push(userId)
      const updatedFriendsArr = copyUser.friends

      update({
        friends: [...updatedFriendsArr]
      })
    }
  }

  const removeFriend = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const buttonElement = e.target as HTMLButtonElement
    const classesArr = buttonElement.classList.value.split(' ')
    const index = classesArr.length - 1
    const userId = classesArr[index]

    if (session) {
      const copyUser = Object.assign({}, session.user as IUser)
      const newFriendsArr = copyUser.friends.filter(friendId => friendId !== userId)

      update({
        friends: [...newFriendsArr]
      })
    }
  }

  // Fetch all users
  useEffect(() => {
    if (session) {
      fetchUsers()
      fetchFriends()
    }
    if (session === null) router.replace('/sign-in')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  // Display current friends UI
  if (session && friendsData && friendsData.length > 0) {
    friendCards = friendsData.map(friend => 
      <CurrentFriendCard 
        key={`${friend.id}-friend-card-of-${session.user.id}`}
        friend={friend}
        removeFriend={removeFriend}
      />
    )
  }

  // Display potential friends UI to to user
  if (usersData && session) {
    potentialCards = usersData.map(user => {
      const matchedIdsArr = session.user.friends.filter(friend => friend.id !== user.id)

      if (user.id === session?.user.id) return null
      if (matchedIdsArr.includes(user.id)) return null

      return (
        <PotentialFriendCard
          key={`${user.id}-potential-friend`}
          user={user}
          addFriend={(e) => addFriend(e)}
        />
      )
    })
  }

  if (session === undefined) return <></>
  if (session === null) return <></>

  return (
    <div className='flex flex-col w-1/2 h-screen border'>
      <h1 className='page_heading'>Friends</h1>
      <div className='flex flex-col items-center mt-10 gap-4'>
        {session?.user.friends.length === 0 && 
          <p className='text-center'>No friends :c</p>
        }
        {(friendsData && friendsData.length > 0 && friendCards.length > 0) && friendCards}
      </div>
      <div className='flex flex-col items-center mt-10'>
        <h1 className='page_secondary_heading mb-5'>Potential friends</h1>
        <div className='flex flex-col gap-4'>
          {(potentialCards && potentialCards.filter(card => card !== null).length > 0) && potentialCards}
          {(potentialCards && !(potentialCards.filter(card => card !== null).length > 0)) && <p>You have befriended everyone!</p>}
          {alreadyAdded && <p className='text-red-500'>Already added friend!</p>}
        </div>
      </div>
    </div>
  )
}

export default Friends