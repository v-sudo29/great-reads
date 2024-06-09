'use client'
import { ChangeEventHandler, MouseEventHandler, useState } from "react"
import { useRouter } from "next/navigation"

interface SignUpFormProps {
  stepNumber: number
  setStepNumber: React.Dispatch<React.SetStateAction<number>>
}

const SignUpForm = ({
  stepNumber,
  setStepNumber
} : SignUpFormProps) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const { name, email, password } = userInfo
  const router = useRouter()

  const formLabelStyles = 'font-montserrat font-medium text-[14px] text-[#344054] xl:absolute xl:text-[12px] xl:font-semibold xl:text-primary xl:px-[14px] xl:py-[10px] xl:pointer-events-none'
  const formTextInputStyles = 'border border-[#D0D5DD] rounded-[4px] h-11 px-[14px] py-[10px] focus:outline-none focus:outline-offset-[-1.5px] focus:outline-[1.5px] focus:outline-[#4285F4] placeholder:font-normal placeholder:text-[#A4B1B8] xl:text-[14px] xl:h-[54px] xl:pt-[30px]'
  const formInputErrorStyles = 'border-[1.5px] border-[#D23B2E] rounded-[4px] h-11 px-[14px] py-[10px] focus:outline-none focus:outline-offset-[-1.5px] focus:outline-[1.5px] focus:outline-[#D23B2E] placeholder:font-normal placeholder:text-[#A4B1B8] xl:text-[14px] xl:h-[54px] xl:pt-[30px]'

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target

    if (name === 'email' && value !== '' && emailError) setEmailError(false) 
    if (name === 'password' && value !== '' && passwordError) setPasswordError(false)
    setUserInfo({ ...userInfo, [name]: value })
  }

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()

    if (
      name === '' ||
      email === '' ||
      password === ''
    ) return

    try {
      setLoading(true)
      const res = await fetch('/api/users/sign-up', {
        method: 'POST',
        body: JSON.stringify(userInfo),
      })
      const data = await res.json()

      if (data.error) setError(data.error)
      if (!data.error) setError('')
      
      // Redirect to login page
      router.replace('/sign-in')
      
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleNextStepClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()

    // Email validation
    if (email === '') setEmailError(true)

    // Password validation
    if (password === '') setPasswordError(true)

    // Email and password validation
    if (email !== '' && password !== '') {
      setStepNumber(2)
    }
  }

  return (
    <form className='flex flex-col w-full rounded-md'>
      <div className='font-montserrat mb-5'>
        <h1 className='text-[18px] text-[#101828] font-semibold leading-[28px]'>
          Create an account
        </h1>
        <p className='text-[14px] font-medium text-[#475467] mt-[2px]'>
          Sign up with Google or an email address
        </p>
      </div>
      {stepNumber === 1 && (
        <div className='flex flex-col gap-6 mb-8'>
          <div className='relative flex flex-col gap-[6px]'>
            <label
              className={formLabelStyles}
              htmlFor='email'
            >
              Email*
            </label>
            <input
              className={emailError ? formInputErrorStyles : formTextInputStyles}
              type='email'
              name='email'
              placeholder='Email Address'
              value={email}
              onChange={handleChange}
            />
            {emailError && (
              <span className='absolute font-montserrat font-semibold bottom-[-21px] text-[12px] text-[#D23B2E]'>Please enter a valid email address</span>
            )}
          </div>

          <div className='relative flex flex-col gap-[6px]'>
            <label
              className={formLabelStyles}
              htmlFor="password"
            >
              Password*
            </label>
            <input
              className={passwordError ? formInputErrorStyles : formTextInputStyles}
              type='password'
              name='password'
              placeholder='Password'
              value={password}
              onChange={handleChange}
              autoComplete='off'
            />
            {passwordError && (
              <span className='absolute font-montserrat font-semibold bottom-[-21px] text-[12px] text-[#D23B2E]'>Please enter a valid password</span>
            )}
          </div>
        </div>
      )}
      {stepNumber === 2 && (
        <div className='flex flex-col gap-[6px]'>
          <label
            className={formLabelStyles}
            htmlFor='name'
          >
            Name*
          </label>
          <input
            className={formTextInputStyles}
            type='text'
            name='name'
            placeholder='Name'
            value={name}
            onChange={handleChange}
          />
        </div>
      )}
      <button
        className='font-montserrat font-semibold text-[14px] leading-[24px] h-11 rounded-[4px] bg-primary text-white xl:h-12'
        type="submit"
        disabled={loading}
        style={{ opacity: loading ? 0.5 : 1 }}
        onClick={stepNumber === 1 ? handleNextStepClick : handleSubmit}
      >
        {stepNumber === 1 && 'Next'}
        {stepNumber === 2 && 'Complete Sign Up'}
      </button>
    </form>
  )
}

export default SignUpForm