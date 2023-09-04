'use client'
import { useSession } from "next-auth/react"
import { useRef, useState } from "react"
import { IBook } from "@/types/bookType"
import React from "react"
import ListCard from "@components/lists/ListCard"

const Lists = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const newListRef = useRef<HTMLInputElement>(null)

  const currentListNameRef = useRef<string | null>(null)
  const updatedListNameRef = useRef<HTMLInputElement>(null)

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

  const handleClickEdit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setShowModal(true)
    const buttonElement = e.target as HTMLButtonElement
    const headingElement = (buttonElement.parentElement as HTMLDivElement).previousSibling as HTMLHeadingElement
    const selectedListName = headingElement.innerText
    currentListNameRef.current = selectedListName
  }

  const handleUpdateListName = async () => {
    if (updatedListNameRef && updatedListNameRef.current && currentListNameRef.current) {
      const copyLists = Object.assign({}, session?.user.lists as Record<string, IBook[]>)
      copyLists[updatedListNameRef.current.value] = copyLists[currentListNameRef.current]

      // Delete old list name
      delete copyLists[currentListNameRef.current]

      // Update new list name in lists
      update({
        lists: Object.assign({}, copyLists)
      })
    }
  }

  let lists: JSX.Element[] = []

  // Create UI to display lists and books in lists
  if (session) {
    const allListNames = Object.keys(session.user.lists)
    lists = allListNames.map((listName, index) => {
    const booksArr = (session.user.lists as Record<string, IBook[]>)[listName]

    const booksJSX = booksArr.map((book, index) => 
      <ListCard
        key={`${book.bookId}-${listName}-${index}`}
        book={book}
        listName={listName}  
      />
    )

      return (
        <div
          key={`${listName}-${index}`}
          className='flex gap-3 justify-between items-center p-3 rounded-md'
        >
          <div className='flex flex-col gap-5'>
            <div className='flex w-full justify-between'>
              <h1 className='font-medium w-full self-center text-2xl'>{listName}</h1>
              <div className='flex gap-2'>
                <button onClick={(e) => handleClickEdit(e)} className='general_button'>Edit</button>
                <button onClick={(e) => handleDeleteList(e)} className={`delete_button ${listName}`}>Delete</button>
              </div>
            </div>
            <div className='flex gap-4'>
              {booksJSX}
            </div>
          </div>
        </div>
      )
    })
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

      {/* LISTS */}
      {session === undefined && <></>}
      {(session && Object.keys(session.user.lists).length > 0) && 
        <div className='relative flex flex-col gap-4 justify-center border'>
          {lists}
        </div>
      }
      {(session && Object.keys(session.user.lists).length === 0) && <div>You don&apos;t have any lists</div> }
      
      {/* UPDATE LIST NAME MODAL */}
      <div
        style={{
          display: showModal ? 'block' : 'none',
          top: '25%',
          left: '33.33%'
        }}
        className='z-20 bg-white absolute rounded-xl shadow-md w-1/3 text-center px-20 py-10 transition-all'
      >
        <div className='flex justify-between w-full'>
          <h1 className='page_secondary_heading'> Update list name</h1>
          <button onClick={() => {
            setShowModal(false)
            if (updatedListNameRef) {
              const input = updatedListNameRef.current
              if (input) input.value = ''
            }
          }} className='general_button'>
            X
          </button>
        </div>
        <input
          ref={updatedListNameRef}
          className='text_field mt-4'
          type='text' placeholder='new list name'
        />
        <button onClick={handleUpdateListName} className='general_button mt-4'>Update</button>
      </div>

      {/* OVERLAY */}
      <div style={{ display: showModal ? 'block' : 'none' }} className='overlay'></div>
    </div>
  )
}

export default Lists