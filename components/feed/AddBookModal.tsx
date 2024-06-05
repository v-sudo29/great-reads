'use client'

import { useSession } from 'next-auth/react'
import { IBook } from '@/types/bookType'

interface IAddBookModal {
  selectedBook: IBook | null,
  showModal: boolean,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const AddBookModal = ({ selectedBook, showModal, setShowModal } : IAddBookModal) => {
  const { data: session, update } = useSession()
  let listButtons: JSX.Element[] | null = null
  
  const addBookToList = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const buttonElement = e.target as HTMLButtonElement
    const listName = buttonElement.innerText

    if (session && selectedBook) {
      const currentLists = Object.assign({}, session.user.lists) as Record<string, IBook[]>
      currentLists[listName].push(selectedBook)

      update({
        lists: Object.assign({}, currentLists)
      })
    }
  }

  if (session) {
    const listNames = Object.keys(session.user.lists)
    listButtons = listNames.map(name => (
      <button
        key={`${name}-button`}
        className='general_button'
        onClick={(e) => addBookToList(e)}
      >
        {name}
      </button>
      )
    )
  }

  return (
    <div
      style={{ display: showModal ? 'block' : 'none' }}
      className='z-20 bg-white absolute mt-72 rounded-xl shadow-md border w-1/3 text-center px-20 py-10 transition-all'
    >
      <div className='flex justify-end'>
        <button onClick={() => setShowModal(false)} className='general_button'>
          X
        </button>
      </div>
      <h2 className='page_secondary_heading'>Choose list to add book</h2>
      <div className='flex flex-col gap-2 mt-10'>
        {listButtons}
      </div>
    </div>
  )
}

export default AddBookModal