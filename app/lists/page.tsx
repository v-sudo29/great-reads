'use client'
import { useSession } from "next-auth/react"
import { useRef } from "react"

const Lists = () => {
  const newListRef = useRef<HTMLInputElement>(null)
  const { data: session } = useSession()

  console.log(session)

  const handleCreate = async () => {
    if (newListRef.current) {
      console.log(newListRef.current.value)
    }
  }

  return (
    <div>
      <h1 className='page_heading'>Lists</h1>
      <div className='flex flex-col gap-3 my-5'>
        <label>Create list</label>
        <input ref={newListRef} className="text_field" type="text" placeholder='new list name'/>
        <div className='self-center'>
          <button onClick={handleCreate} className='general_button'>Create</button>
        </div>
      </div>
      {session === undefined && <></>}
      {(session && Object.keys(session.user.lists).length > 0) && <>session.user.lists</>}
      {(session && Object.keys(session.user.lists).length === 0) && <div>You don&apos;t have any lists</div> }
    </div>
  )
}

export default Lists