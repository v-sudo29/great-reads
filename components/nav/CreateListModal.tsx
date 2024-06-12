import ExitIcon from "@components/common/icons/ExitIcon"
import { ChangeEventHandler, useState } from "react"

interface CreateListModalProps {
  handleListModalClose: () => void
}

const CreateListModal = ({
  handleListModalClose
} : CreateListModalProps) => {
  const [listName, setListName] = useState('')
  const [listNameError, setListNameError] = useState(false)
  
  const formLabelStyles = 'font-montserrat font-medium text-[14px] text-[#344054] xl:text-[12px] xl:text-base xl:pointer-events-none'
  const formTextInputStyles = 'border border-[#D0D5DD] rounded-[4px] h-12 px-[14px] py-[10px] focus:outline-none focus:outline-offset-[-1.5px] focus:outline-[1.5px] focus:outline-[#4285F4] placeholder:font-normal placeholder:text-[#A4B1B8] xl:text-base xl:h-[54px]'
  const formInputErrorStyles = 'border-[1.5px] border-[#D23B2E] rounded-[4px] h-12 px-[14px] py-[10px] focus:outline-none focus:outline-offset-[-1.5px] focus:outline-[1.5px] focus:outline-[#D23B2E] placeholder:font-normal placeholder:text-[#A4B1B8] xl:text-base xl:h-[54px]'

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target

    if (name === 'listName' && value !== '' && listName) setListNameError(false) 
    setListName(value)
  }

  return (
    <div className='absolute flex justify-center w-full h-full px-4 xl:fixed xl:top-0 xl:left-0'>
      <div className='relative mt-[6.5rem] flex flex-col w-full h-max max-w-[480px] gap-3 px-4 py-5 bg-white shadow-xl rounded-xl xl:mt-auto xl:mb-auto xl:p-6'>
        <button
          className='absolute right-[22px] top-[22px]'
          onClick={handleListModalClose}
        >
          <ExitIcon/>
        </button>
        <h1 className='font-montserrat font-semibold text-[18px] leading-[28px]'>
          Create a new list
        </h1>

        <div className='relative flex flex-col gap-[6px]'>
          <label
            className={formLabelStyles}
            htmlFor='listName'
          >
            List name
          </label>
          <input
            className={listNameError ? formInputErrorStyles : formTextInputStyles}
            type='text'
            name='listName'
            placeholder='Like "Hidden Gems" or "Summer 2024"'
            value={listName}
            onChange={handleChange}
          />
          {listNameError && (
            <span className='absolute font-montserrat font-semibold bottom-[-21px] text-[12px] text-[#D23B2E]'>Please enter a valid email address</span>
          )}
        </div>

        <div className='flex justify-center py-3 xl:pb-0'>
        </div>
      </div>
    </div>
  )
}

export default CreateListModal