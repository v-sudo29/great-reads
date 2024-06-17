import React from 'react'

interface IUpdateListNameModal {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  updatedListNameRef: React.RefObject<HTMLInputElement>
  handleUpdateListName: () => Promise<void>
}

const UpdateListNameModal = ({
  showModal,
  setShowModal,
  updatedListNameRef,
  handleUpdateListName,
}: IUpdateListNameModal) => {
  return (
    <div
      style={{
        display: showModal ? 'block' : 'none',
        top: '25%',
        left: '33.33%',
      }}
      className="z-20 bg-white absolute rounded-xl shadow-md w-1/3 text-center px-20 py-10 transition-all"
    >
      <div className="flex justify-between w-full">
        <h1 className="page_secondary_heading"> Update list name</h1>
        <button
          onClick={() => {
            setShowModal(false)
            if (updatedListNameRef) {
              const input = updatedListNameRef.current
              if (input) input.value = ''
            }
          }}
          className="general_button"
        >
          X
        </button>
      </div>
      <input
        ref={updatedListNameRef}
        className="text_field mt-4"
        type="text"
        placeholder="new list name"
      />
      <button onClick={handleUpdateListName} className="general_button mt-4">
        Update
      </button>
    </div>
  )
}

export default UpdateListNameModal
