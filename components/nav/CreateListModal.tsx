import ExitIcon from "@components/common/icons/ExitIcon"
import { ChangeEventHandler, MouseEventHandler, useState } from "react"
import { useSession } from "next-auth/react"

interface CreateListModalProps {
  handleListModalClose: () => void
}

const defaultColors = [
  {
    color: 'FF4141'
  },
  {
    color: 'FFC700'
  },
  {
    color: 'FF8C05'
  },
  {
    color: '59BC99',
  },
  {
    color: 'BD68FF'
  },
  {
    color: '3DCAE8'
  },
  {
    color: '000000'
  }
]

const CreateListModal = ({
  handleListModalClose
} : CreateListModalProps) => {
  const [listName, setListName] = useState('')
  const [listNameError, setListNameError] = useState(false)
  const [color, setColor] = useState('FF4141')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { data: session, update } = useSession()
  
  const formLabelStyles = 'font-montserrat font-medium text-[14px] text-[#344054] xl:text-[12px] xl:text-base xl:pointer-events-none'
  const formTextInputStyles = 'border border-[#D0D5DD] rounded-[4px] h-12 px-[14px] py-[10px] focus:outline-none focus:outline-offset-[-1.5px] focus:outline-[1.5px] focus:outline-[#4285F4] placeholder:font-normal placeholder:text-[#A4B1B8] xl:text-base xl:h-[54px]'
  const formInputErrorStyles = 'border-[1.5px] border-[#D23B2E] rounded-[4px] h-12 px-[14px] py-[10px] focus:outline-none focus:outline-offset-[-1.5px] focus:outline-[1.5px] focus:outline-[#D23B2E] placeholder:font-normal placeholder:text-[#A4B1B8] xl:text-base xl:h-[54px]'

  const colorRadioButtons = defaultColors.map((obj, index) => {
    return (
      <div
        key={`${index}-${obj.color}`}
        className='flex rounded-[4px]'
        onChange={() => setColor(obj.color)}
        style={{
          border: obj.color === color ? '2px solid #4C4C4C' : '',
          width: obj.color === color ? 'w-8' : '',
          height: obj.color === color ? 'h-8' : '',
          padding: obj.color === color ? '3px 3px' : ''
        }}
      >
        <input
          className='appearance-none w-8 h-8 rounded-[4px] checked:w-[22px] checked:h-[22px] checked:rounded-[2px] cursor-pointer'
          style={{
            backgroundColor: `#${obj.color}`
          }}
          type="radio"
          name="listColorFF4141"
          id="listColorFF4141"
          defaultChecked={index === 0 && true}
        />
      </div>
    )
  })  

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target

    if (name === 'listName' && value !== '' && listName) setListNameError(false) 
    setListName(value)
  }

  const handleSubmit: MouseEventHandler<HTMLButtonElement>= async (e) => {
    e.preventDefault()

    if (listNameError || !session?.user.lists) return

    // try {
    //   setLoading(true)
    //   const listsCopy = session?.user.lists

    //   const res = await update({
    //     lists: {
    //       ...listsCopy,
    //       listName: {
    //         color: '',
    //         books: []
    //       }
    //     }
    //   }) 
    //   console.log('Create new list response: ', res)
    // } catch(err) {
    //   console.error(err)
    // } finally {
    //   setLoading(false)
    // }    
  }

  const handleListColorClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    console.log('clicked!')
  }

  return (
    <div className='absolute flex justify-center z-20 w-full h-full px-4 xl:fixed xl:top-0 xl:left-0'>
      <div className='relative mt-[6.5rem] flex flex-col w-full h-max max-w-[358px] gap-3 px-4 py-5 bg-white shadow-xl rounded-xl xl:mt-auto xl:mb-auto xl:p-6'>
        <button
          className='absolute right-[22px] top-[22px]'
          onClick={handleListModalClose}
        >
          <ExitIcon/>
        </button>
        <h1 className='font-montserrat font-semibold text-[18px] leading-[28px]'>
          Create a new list
        </h1>
        <form>
          <div className='relative flex flex-col gap-[6px]'>
            <label
              className={formLabelStyles}
              htmlFor='listName'
            >
              List Name
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
          
          {/* TODO: List Colors Here */}
          <div className='flex flex-col gap-3 mt-4'>
            <label
              className={formLabelStyles}
              htmlFor='listColor'
            >
              List Color
            </label>
            <div className='flex gap-[17px]'>
              {colorRadioButtons}
              {/* <input
                className='appearance-none w-8 h-8 bg-[#FF4141] rounded-[4px] checked:outline-2 checked:outline checked:outline-border-[#4C4C4C]'
                type="radio"
                name="listColorFF4141"
                id="listColorFF4141"
                defaultChecked={true}
              />
              <input
                className='appearance-none w-8 h-8 bg-[#FFC700] rounded-[4px] checked:outline-2 checked:outline checked:outline-border-[#4C4C4C]'
                type="radio"
                name="listColorFF4141"
                id="listColorFF4141"
              /> */}
            </div>
          </div>

          <button
            className='flex w-full justify-center items-center mt-6 font-montserrat font-semibold text-[14px] leading-[24px] h-11 rounded-[4px] bg-primary text-white xl:h-12 xl:text-base'
            type="submit"
            disabled={loading}
            style={{ opacity: loading ? 0.5 : 1 }}
            onClick={handleSubmit}
          >
            Create list
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateListModal