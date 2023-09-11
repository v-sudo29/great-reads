import React from 'react'
import AllBookCards from '@components/lists/list-detail/AllBookCards'

const ListDetail = ({ params }: { params: { list: string } }) => {
  return (
    <div>
      <h1 className='page_heading'>{params.list.replace(/_/, ' ')}</h1>
      <AllBookCards 
        params={params}
      />
    </div>
    
  )
}

export default ListDetail