import React from 'react'

const ListDetail = ({ params }: { params: { list: string } }) => {

  return (
    <div>
      <h1>List: {params.list}</h1>
    </div>
    
  )
}

export default ListDetail