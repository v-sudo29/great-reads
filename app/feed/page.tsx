'use client'

import { FetchData, Item } from '@customTypes/googleBooksApiTypes'
import { useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { IBook } from '@customTypes/bookType'
import ResultCard from '@components/feed/ResultCard'
import AddBookModal from '@components/feed/AddBookModal'
import SearchResults from '@components/feed/SearchResults'

const Feed = () => {
  const [searchResults, setSearchResults] = useState<Item[] | null>(null)
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null)
  const [showModal, setShowModal] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  const { data: session } = useSession()
  console.log(session?.user)
  let resultsCards: JSX.Element[] | null = null

  const fetchData = async () => {
    if (searchRef.current) {
      const searchTerms = searchRef.current.value

      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${searchTerms}`
        )
        const data: FetchData = await response.json()
        setSearchResults(data.items)
      } catch (error) {
        console.log(error)
        return null
      }
    }
  }

  if (searchResults)
    resultsCards = searchResults.map((book) => (
      <ResultCard
        key={book.id}
        book={book}
        setShowModal={setShowModal}
        setSelectedBook={setSelectedBook}
      />
    ))

  return (
    <>
      <div className="relative w-full px-60">
        <h1 className="page_heading">Feed</h1>
        <div className="flex gap-2 justify-center">
          <div>
            <label className="text_field_label">Search</label>
            <input ref={searchRef} className="text_field" />
          </div>
          <button onClick={fetchData} className="self-end general_button">
            Search
          </button>
        </div>
        <SearchResults
          searchResults={searchResults}
          setShowModal={setShowModal}
          setSelectedBook={setSelectedBook}
        />
      </div>

      {/* MODAL */}
      <AddBookModal
        selectedBook={selectedBook}
        showModal={showModal}
        setShowModal={setShowModal}
      />

      {/* OVERLAY */}
      <div
        style={{ display: showModal ? 'block' : 'none' }}
        className="overlay"
      ></div>
    </>
  )
}

export default Feed
