import Image from 'next/image'
import { Item } from '@/types/fetchTypes'

const ResultCard = ({ book, setShowModal } : { book: Item, setShowModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const handleAddBook = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setShowModal(true)
  }

  return (
    <div key={book.id} className='result_card'>
      <h1 className='text-xl font-medium'>{book.volumeInfo.title}</h1>
      <div
        className='relative overflow-hidden rounded-lg'
        style={{ height: '13rem', width: '10rem' }}
      >
        {book.volumeInfo.imageLinks?.thumbnail ? (
          <Image
            src={book.volumeInfo.imageLinks.thumbnail}
            alt={book.volumeInfo.title + ' image cover'}
            fill={true}
            sizes='100px'
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <Image
            src={'/default-book.svg'}
            alt={book.volumeInfo.title + ' image cover'}
            fill={true}
            sizes='100px'
            style={{ objectFit: 'cover' }}
          />
        )}
      </div>
      <span>
        By:&nbsp;
        {(book.volumeInfo.authors && book.volumeInfo.authors.length > 0) ? 
          book.volumeInfo.authors?.join(', ') : book.volumeInfo.authors}
      </span>
      <button onClick={(e) => handleAddBook(e)} className='add_button'>Add</button>
    </div>
  )
}

export default ResultCard