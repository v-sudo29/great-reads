'use client'

import { FetchData, Item } from "@/types/fetchTypes"
import { useRef, useState } from "react"
import Image from "next/image"

const Feed = () => {
  const [searchResults, setSearchResults] = useState<Item[] | null>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  let resultsCards: JSX.Element[] | null = null

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

  if (searchResults) resultsCards = searchResults.map(book => {
    return (
      <div key={book.id} className='result_card'>
        <h1 className='text-xl font-medium'>{book.volumeInfo.title}</h1>
        <div
          className='relative overflow-hidden rounded-lg'
          style={{ height: '13rem', width: '10rem' }}
        >
          <Image
            src={book.volumeInfo.imageLinks.thumbnail}
            alt={book.volumeInfo.title + ' image cover'}
            fill={true}
            objectFit="cover"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <span>
          Author:&nbsp;
          {(book.volumeInfo.authors && book.volumeInfo.authors.length > 0) ? 
            book.volumeInfo.authors?.join(', ') : book.volumeInfo.authors}
        </span>
        <span>Publisher: {book.volumeInfo.publisher}</span>
        <span>Published Date: {book.volumeInfo.publishedDate}</span>
      </div>
    )
  })

  return (
    <div className='w-full px-60'>
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(25rem, 1fr))',
              gap: '2rem'
            }}
          >
            {resultsCards}
          </div>
        }
      </div>
    </div>
  )
}

export default Feed