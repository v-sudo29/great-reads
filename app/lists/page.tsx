'use client'
import { useSession } from "next-auth/react"
import { useRef, useState } from "react"
import { IBook } from "@customTypes/bookType"
import React from "react"
import ListBookCard from "@components/lists/ListBookCard"
import ListCard from "@components/lists/ListCard"
import UpdateListNameModal from "@components/lists/UpdateListNameModal"

const Lists = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const newListRef = useRef<HTMLInputElement>(null)
  const currentListNameRef = useRef<string | null>(null)
  const updatedListNameRef = useRef<HTMLInputElement>(null)

  const { data: session, update } = useSession()

  const handleCreateList = async () => {
    if (session && newListRef.current?.value && newListRef.current?.value.replace(/\s/g, '').length) {

      // Check if new list name already exists in lists
      const listName = newListRef.current.value
      const alreadyExists = Object.keys(session.user.lists).includes(listName)
      if (alreadyExists) return setError('List name already exists')
      
      const newListObj = { [newListRef.current.value]: [] }

      await update({ 
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
    const headingElement = buttonElement.parentElement?.previousSibling as HTMLHeadingElement
    const listName = headingElement.innerText

    // Remove targeted name from list names
    if (session) {
      const copyList = Object.assign({}, session.user.lists as Record<string, IBook[]>)
      delete copyList[listName]

      update({
        lists: Object.assign({}, copyList)
      })
    }
  }

  const handleClickEdit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
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
      <ListBookCard
        key={`${book.bookId}-${listName}-${index}`}
        book={book}
        listName={listName}  
      />
    )

      return (
        <ListCard
          key={`${listName}-${index}`}
          listName={listName}
          handleClickEdit={handleClickEdit}
          handleDeleteList={handleDeleteList}
          booksJSX={booksJSX}
        />
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
      
      {/* Display default text if users don't have lists */}
      {(session && Object.keys(session.user.lists).length === 0) && <div>You don&apos;t have any lists</div> }
      
      {/* UPDATE LIST NAME MODAL */}
      <UpdateListNameModal
        showModal={showModal}
        setShowModal={setShowModal}
        updatedListNameRef={updatedListNameRef}
        handleUpdateListName={handleUpdateListName}
      />

      {/* OVERLAY */}
      <div style={{ display: showModal ? 'block' : 'none' }} className='overlay'></div>
    </div>
  )
}

export default Lists