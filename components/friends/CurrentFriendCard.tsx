import React from 'react'
import { IOtherUser } from '@customTypes/userTypes'

interface ICurrentFriendCard {
  friend: IOtherUser,
  removeFriend: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>
}

const CurrentFriendCard = ({ friend, removeFriend } : ICurrentFriendCard) => {
  return (
    <div className='flex justify-between h-10 w-80'>
      <h1>{friend.name}</h1>
      <button
        onClick={(e) => removeFriend(e)}
        className={`delete_button ${friend.id}`}
      >
        Remove
      </button>
    </div>
  )
}

export default CurrentFriendCard