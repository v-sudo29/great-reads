'use client'

import React from 'react'
import BookCard from './BookCard'
import { useSession } from 'next-auth/react'
import { IBook } from '@customTypes/bookType'

const AllBookCards = ({ params }: { params: { list: string } }) => {
  const { data: session } = useSession()
  let bookCards: JSX.Element[] = []

  if (session) {
    const booksArr = (session.user.lists as Record<string, IBook[]>)[
      params.list
    ]
    if (booksArr)
      bookCards = booksArr.map((book, index) => (
        <BookCard
          key={`${book.bookId}-${params.list}-list-detail`}
          book={book}
          index={index}
        />
      ))
  }
  return <div>{bookCards.length > 0 && bookCards}</div>
}

export default AllBookCards
