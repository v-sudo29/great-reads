import React from 'react'
import Image from 'next/image'
import { IBook } from '@/types/bookType'

interface IListDetailBookCard {
  book: IBook,
  index: number
}

const BookCard = ({ book, index } : IListDetailBookCard) => {
  return (
    <div>
      <div className='flex gap-4'>
        <div className='font-medium'>{index + 1}</div>
        <span>{book.title}</span>
      </div>
      <div 
        className='relative overflow-hidden rounded-lg'
        style={{ height: '10rem', width: '7rem' }}
      >
        <Image
          src={book.imageLink}
          priority={true}
          alt={book.title + ' image cover'}
          fill={true}
          sizes='30px'
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    </div>
  )
}

export default BookCard