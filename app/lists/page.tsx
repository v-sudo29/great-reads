'use client'
import { useSession } from "next-auth/react"
import { useRef, useState } from "react"
import React from "react"

const Lists = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const newListRef = useRef<HTMLInputElement>(null)
  const { data: session, update } = useSession()

  console.log(session)

  const handleCreateList = async () => {
    if (session && newListRef.current?.value && newListRef.current?.value.replace(/\s/g, '').length) {

      // Check if new list name already exists in lists
      const listName = newListRef.current.value
      const alreadyExists = Object.keys(session.user.lists).includes(listName)
      if (alreadyExists) return setError('List name already exists')
      
      const newListObj = { [newListRef.current.value]: [] }

      update({ 
        lists: Object.assign({}, session.user.lists, newListObj)
      })

      setError('')
      setSuccess(true)
    } else {
      setError('List name cannot be empty')
      setSuccess(false)
    }
  }

  const handleDeleteList = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setError('')
    setSuccess(false)
    const buttonElement = e.target as HTMLButtonElement
    const headingElement = buttonElement.previousSibling as HTMLHeadingElement
    const listName = headingElement.innerHTML

    // Remove targeted name from list names
    if (session) {
      const copyList = { ...session.user.lists }
      delete copyList[listName]

      update({
        lists: {
          ...copyList
        }
      })
    }
  }

  let lists: JSX.Element[] = []

  // Create UI to display lists
  if (session) {
    const allListNames = Object.keys(session.user.lists)
    lists = allListNames.map((name, index) => 
      <div
        key={`${name}-${index}`}
        className='flex gap-3 justify-between items-center shadow-lg p-3 rounded-md'
      >
        <h1 className='font-semibold'>{name}</h1>
        <button onClick={(e) => handleDeleteList(e)} className={`delete_button ${name}`}>Delete</button>
      </div>
    )
  }

  return (
    <div>
      <h1 className='page_heading'>Lists</h1>
      <div className='flex flex-col gap-3 my-5'>
        {error !== '' && <h1 className='text-red-500'>{error}</h1>}
        {success && <h1 className='text-green-500'>{newListRef.current && newListRef.current.value} list has been created!</h1>}
        <label>Create list</label>
        <input ref={newListRef} className="text_field" type="text" placeholder='new list name'/>
        <div className='self-center'>
          <button onClick={handleCreateList} className='general_button'>Create</button>
        </div>
      </div>
      {session === undefined && <></>}
      {(session && Object.keys(session.user.lists).length > 0) && 
        <div className='flex flex-col gap-4 justify-center'>
          {lists}
        </div>
      }
      {(session && Object.keys(session.user.lists).length === 0) && <div>You don&apos;t have any lists</div> }
    </div>
  )
}

export default Lists