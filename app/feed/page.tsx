'use client'

import { FetchData, Item } from "@/types/fetchTypes"
import { useRef, useState } from "react"
import ResultCard from "@components/feed/ResultCard"
import { useSession } from "next-auth/react"

const Feed = () => {
  const [searchResults, setSearchResults] = useState<Item[] | null>(null)
  const [showModal, setShowModal] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const { data: session } = useSession()

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

  const addBookToList = async () => {
    console.log('clicked!')
  }

  if (searchResults) resultsCards = searchResults.map(book => <ResultCard key={book.id} book={book} setShowModal={setShowModal} />)
  if (session) {
    const listNames = Object.keys(session.user.lists)
    listButtons = listNames.map(name => (
      <button
        key={`${name}-button`}
        className='general_button'
        onClick={addBookToList}
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
    <div
      style={{ display: showModal ? 'block' : 'none' }}
      className='z-20 bg-white absolute mt-72 rounded-xl shadow-md border w-1/3 text-center px-20 py-10 transition-all'
    >
      <h2 className='page_secondary_heading'>Choose list to add book</h2>
      <div className='flex flex-col gap-2 mt-10'>
        {listButtons}
      </div>
    </div>
    <div
      style={{ display: showModal ? 'block' : 'none' }}
      className='z-10 absolute min-h-full min-w-full bg-gray-800 opacity-40 transition-all'
    >
    </div>
  </>
  )
}

export default Feed