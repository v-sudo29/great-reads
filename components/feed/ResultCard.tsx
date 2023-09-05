import Image from 'next/image'
import { Item } from '@/types/googleApiTypes'
import { IBook } from '@/types/bookType'

interface IResultCard {
  book: Item,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedBook: React.Dispatch<React.SetStateAction<IBook | null>>
}

const ResultCard = ({ book, setShowModal, setSelectedBook } : IResultCard ) => {
  const handleAddBook = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setShowModal(true)
    setSelectedBook({
      bookId: book.id,
      title: book.volumeInfo.title,
      imageLink: book.volumeInfo.imageLinks?.thumbnail ?? '/default-book.svg',
      authors: book.volumeInfo.authors ?? []
    })
  }

  return (
    <div key={book.id} className={`result_card ${book.id}`}>
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