'use client'
import React from 'react'
import { IBook } from '@customTypes/bookType'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

interface IListCard {
  book: IBook, 
  listName: string
}

const ListBookCard = ({ book, listName } : IListCard) => {
  const { data: session, update } = useSession()

  const handleDeleteBook = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const buttonElement = e.target as HTMLButtonElement
    const parentDiv = buttonElement.parentElement?.parentElement as HTMLDivElement
    const classesArr = parentDiv.classList.value.split(' ')
    const selectedBookId = classesArr[classesArr.length - 1]
  
    if (session) {
      const copyLists = Object.assign({}, session.user.lists as Record<string, IBook[]>)

      // Remove book based on bookId
      const updatedLists = copyLists[listName].filter(book => book.bookId !== selectedBookId)
      copyLists[listName] = updatedLists

      console.log(copyLists)
      // Update lists in session
      update({
        lists: Object.assign({}, copyLists)
      })
    }
  }

  return (
    <div
      className={`flex flex-col align-center gap-4 rounded-md border p-4 ${book.bookId}`}
      style={{ width: '12rem' }}
    >
      <h1 className='font-medium text-sm text-center'>{book.title}</h1>
      <div className='flex justify-center'>
        <div
          className='relative overflow-hidden rounded-lg'
          style={{ height: '10rem', width: '7rem' }}
        >
          <Image
            priority={true}
            src={book.imageLink}
            alt={book.title + ' image cover'}
            fill={true}
            sizes='30px'
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>
      <div className='text-center'>
        <button onClick={(e) => handleDeleteBook(e)} className='delete_button'>Remove</button>
      </div>
    </div>
  )
}

export default ListBookCard