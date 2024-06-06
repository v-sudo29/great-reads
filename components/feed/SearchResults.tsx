'use client'

import { Item } from '@customTypes/googleBooksApiTypes'
import { IBook } from '@customTypes/bookType'
import ResultCard from './ResultCard'

interface ISearchResults {
  searchResults: Item[] | null,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedBook: React.Dispatch<React.SetStateAction<IBook | null>>
}

const SearchResults = ({ searchResults, setShowModal, setSelectedBook }: ISearchResults) => {
  let resultsCards: JSX.Element[] | null = null

  if (searchResults) resultsCards = searchResults.map(book => 
    <ResultCard
      key={book.id}
      book={book}
      setShowModal={setShowModal}
      setSelectedBook={setSelectedBook}
    />
  )
  return (
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
  )
}

export default SearchResults