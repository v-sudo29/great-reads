'use client'

import { FetchData, Item } from "@/types/googleBooksApiTypes"
import { useRef, useState } from "react"
import { useSession } from "next-auth/react"
import { IBook } from "@/types/bookType"
import ResultCard from "@components/feed/ResultCard"
import React from "react"

const Feed = () => {
  const [searchResults, setSearchResults] = useState<Item[] | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const { data: session, update } = useSession()
  console.log(session?.user)
  let resultsCards: JSX.Element[] | null = null
  let listButtons: JSX.Element[] | null = null

  const fetchData = async () => {
    if (searchRef.current) {
      const searchTerms = searchRef.current.value

      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerms}`)
        const data: FetchData = await response.json()
        setSearchResults(data.items)
      } catch (error) {
        console.log(error)
        return null
      } 
    }
  }

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

  if (searchResults) resultsCards = searchResults.map(book => 
    <ResultCard
      key={book.id}
      book={book}
      setShowModal={setShowModal}
      setSelectedBook={setSelectedBook}
    />
  )
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
    <>
      <div className='relative w-full px-60'>
        <h1 className='page_heading'>Feed</h1>
        <div className='flex gap-2 justify-center'>
          <div>
            <label className='text_field_label'>Search</label>
            <input ref={searchRef} className='text_field'/>
          </div>
          <button onClick={fetchData} className='self-end general_button'>Search</button>
        </div>
        <div className="w-full mt-5">
          {resultsCards && resultsCards.length > 0 && 
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(17rem, 1fr))',
                gap: '2rem'
              }}
            >
              {resultsCards}
            </div>
          }
        </div>
      </div>

      {/* MODAL */}
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

      {/* OVERLAY */}
      <div style={{ display: showModal ? 'block' : 'none' }} className='overlay'></div>
    </>
  )
}

export default Feed