import ExitIcon from "@components/common/icons/ExitIcon"
import { ChangeEventHandler, MouseEventHandler, useState } from "react"
import { useSession } from "next-auth/react"
import Image from "next/image"

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
    color: '4F56FF'
  },
  {
    color: 'FD99FF'
  },
  {
    color: 'no-color'
  }
]

const CreateListModal = ({
  handleListModalClose
} : CreateListModalProps) => {
  const [listName, setListName] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [color, setColor] = useState<string | null>('FF4141')
  const [customColor, setCustomColor] = useState<string | null>(null)
  const [error, setError] = useState(false) // TODO: create error UI if creating list fails
  const [loading, setLoading] = useState(false)
  const { data: session, update } = useSession()
  
  const formLabelStyles = 'font-montserrat font-medium text-[14px] text-[#344054] xl:text-[12px] xl:text-base xl:pointer-events-none'
  const formTextInputStyles = 'border border-[#D0D5DD] rounded-[4px] h-12 px-[14px] py-[10px] focus:outline-none focus:outline-offset-[-1.5px] focus:outline-[1.5px] focus:outline-[#4285F4] placeholder:font-normal placeholder:text-[#A4B1B8] xl:text-base xl:h-[54px]'

  const handleDefaultColorClick = (color : string) => {
    setColor(color)
    setCustomColor(null)
  }

  const colorRadioButtons = defaultColors.map((obj, index) => {
    if (index !== defaultColors.length - 1) {
      return (
        <div
          key={`${index}-${obj.color}`}
          className='flex rounded-[4px]'
          onChange={() => handleDefaultColorClick(obj.color)}
          style={ obj.color === color ? {
            border: obj.color === color ? '2px solid #4C4C4C' : '',
            width: obj.color === color ? 'w-8' : '',
            height: obj.color === color ? 'h-8' : '',
            padding: obj.color === color ? '3px 3px' : ''
          } : undefined}
        >
          <input
            className='appearance-none w-8 h-8 rounded-[4px] checked:w-[22px] checked:h-[22px] checked:rounded-[2px] cursor-pointer'
            style={{
              backgroundColor: `#${obj.color}`,
              width: obj.color === color ? '22px' : '32px',
              height: obj.color === color ? '22px' : '32px',
              borderRadius: obj.color === color ? '2px' : '4px'
            }}
            type="radio"
            name={`chooseListColor`}
            id={`listColor-${obj.color}`}
            defaultChecked={index === 0 && true}
          />
          <label
            className='w-0'
            htmlFor={`listColor-${obj.color}`}
          ></label>
        </div>
      )
    } 
    else return (
      <div
        key={`${index}-custom-color`}
        className='relative w-8 h-8 rounded-[4px] overflow-hidden'
        style={{
          background: customColor ? 
            'linear-gradient(45deg, red, orange, #19E515, #1574E5, #BD00FF, #FF00F5)'
            : '',
          padding: customColor ? '3px 3px' : ''
        }}
      >
        <input
          type="color"
          className='appearance-none opacity-0 cursor-pointer pointer-events-auto'
          onChange={(e) => {
            const chosenColor = e.target.value.split('#')[1]
            setCustomColor(chosenColor)
            setColor(null)
          }}
        />
        {!customColor && (
          <Image
            className='absolute top-0 pointer-events-none'
            src='/color-picker.png'
            width='32'
            height='32'
            alt=''
          />
        )}
        {customColor && (
          <div
            className='absolute top-[2px] left-[2px] rounded-[2px] w-[28px] h-[28px] bg-white border-[3px] border-white pointer-events-none'
          >
            <div className='rounded-[2px] w-full h-full'
            style={{
              backgroundColor: customColor ? `#${customColor}` : ''
            }}
            >
            </div>
          </div>
        )}
      </div>
    )
  })

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { value } = target

    if (value !== '') {
      setListName(value)
      setIsButtonDisabled(false)
    } else {
      setListName('')
      setIsButtonDisabled(true)
    }
  }

  const handleSubmit: MouseEventHandler<HTMLButtonElement>= async (e) => {
    e.preventDefault()

    if (listName === '') return
    if (!color && !customColor) return

    try {
      setLoading(true)
      const res = await update({
        lists: {
          ...session?.user.lists,
          [listName]: {
            color: color ?? customColor,
            books: []
          }
        }
      })

      // Check if new list exists in session
      if (!res?.user.lists.hasOwnProperty(listName)) {
        setError(true) // TODO: error UI in case new list could not be updated in DB
      } else handleListModalClose()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }   
  }

  return (
    <div className='absolute flex justify-center z-20 w-full h-full px-4 xl:fixed xl:top-0 xl:left-0'>
      <div className='relative mt-[6.5rem] flex flex-col w-full h-max max-w-[358px] gap-3 px-4 py-5 bg-white rounded-xl xl:max-w-[480px] xl:mt-auto xl:mb-auto xl:p-6 xl:gap-5'>
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
              className={formTextInputStyles}
              type='text'
              name='listName'
              placeholder='Like "Hidden Gems" or "Summer 2024"'
              value={listName}
              onChange={handleChange}
            />
          </div>
          
          <div className='flex flex-col gap-3 mt-4 xl:mt-6'>
            <label
              className={formLabelStyles}
              htmlFor='listColor'
            >
              List Color
            </label>
              <fieldset className='flex gap-[17px] flex-wrap w-full xl:gap-[18px]'>
                {colorRadioButtons}
              </fieldset>
          </div>

          <button
            className='flex w-full justify-center items-center mt-6 font-montserrat font-semibold text-[14px] leading-[24px] h-11 rounded-[22px] bg-primary text-white xl:h-12 xl:text-base xl:mt-8'
            type="submit"
            disabled={!loading ? isButtonDisabled : loading}
            style={{
              opacity: (!loading && isButtonDisabled) ?  0.5 :
                (loading && !isButtonDisabled) ? 0.5 :
                (!loading && !isButtonDisabled) ? 1 :
                ''
            }}
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