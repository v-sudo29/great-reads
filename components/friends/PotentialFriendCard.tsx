import React from 'react'
import { IOtherUser } from '@customTypes/userTypes'

interface IPotentialFriendCard {
  user: IOtherUser,
  addFriend: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>
}

const PotentialFriendCard = ({ user, addFriend } : IPotentialFriendCard) => {
  return (
    <div className='flex justify-between h-10 w-80'>
      <h1>{user.name}</h1>
      <button
        onClick={(e) => addFriend(e)}
        className={`general_button ${user.id}`}
      >
        Add friend
      </button>
    </div>
  )
}

export default PotentialFriendCard