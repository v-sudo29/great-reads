import React from 'react'
import Link from 'next/link'

interface IListCard {
  listName: string,
  handleClickEdit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>,
  handleDeleteList: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>,
  booksJSX: React.JSX.Element[]
}

const ListCard = ({ listName, handleClickEdit, handleDeleteList, booksJSX } : IListCard) => {
  return (
    <div className='flex gap-3 justify-between items-center p-3 rounded-md'>
      <Link href={`/lists/${listName}`}>
        <div className='flex flex-col gap-5'>
          <div className='flex w-full justify-between'>
            <h1 className='font-medium w-full self-center text-2xl'>{listName}</h1>
            <div className='flex gap-2'>
              {(listName !== 'Read' && listName !== 'Currently Reading' && listName !== 'Want to Read') &&
              <>
                <button onClick={(e) => handleClickEdit(e)} className='general_button'>Edit</button>
                <button onClick={(e) => handleDeleteList(e)} className={`delete_button ${listName}`}>Delete</button>
              </>
              }
            </div>
          </div>
          <div className='flex gap-4'>
            {booksJSX}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ListCard