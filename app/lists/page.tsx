'use client'
import { useSession } from "next-auth/react"
import { useRef, useState } from "react"

const Lists = () => {
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const newListRef = useRef<HTMLInputElement>(null)
  const { data: session, update } = useSession()

  console.log(session)

  const handleCreateList = async () => {
    if (session && newListRef.current?.value && newListRef.current?.value.replace(/\s/g, '').length) {
      update({ 
        lists: {
          ...session.user.lists,
          [newListRef.current.value]: []
        }
      })
      setError(false)
      setSuccess(true)
    } else {
      setError(true)
      setSuccess(false)
    }
  }

  let lists: JSX.Element[] = []

  // Create UI to display lists
  if (session) {
    const allListNames = Object.keys(session.user.lists)
    lists = allListNames.map((name, index) => 
      <div key={`${name}-${index}`}>
        <h1>{name}</h1>
      </div>
    )
  }

  return (
    <div>
      <h1 className='page_heading'>Lists</h1>
      <div className='flex flex-col gap-3 my-5'>
        {error && <h1 className='text-red-500'>List name cannot be empty</h1>}
        {success && <h1 className='text-green-500'>{newListRef.current && newListRef.current.value} list has been created!</h1>}
        <label>Create list</label>
        <input ref={newListRef} className="text_field" type="text" placeholder='new list name'/>
        <div className='self-center'>
          <button onClick={handleCreateList} className='general_button'>Create</button>
        </div>
      </div>
      {session === undefined && <></>}
      {(session && Object.keys(session.user.lists).length > 0) && <>{lists}</>}
      {(session && Object.keys(session.user.lists).length === 0) && <div>You don&apos;t have any lists</div> }
    </div>
  )
}

export default Lists