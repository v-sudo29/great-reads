'use client'
import { ChangeEventHandler, FormEventHandler, useState } from "react"
import { useRouter } from "next/navigation"

const SignUpForm = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: ''
  })
  const { name, email, password } = userInfo
  const router = useRouter()
  const formLabelStyles = 'font-montserrat font-medium text-[14px] text-[#344054] xl:absolute xl:text-[12px] xl:font-semibold xl:text-primary xl:px-[14px] xl:py-[10px] xl:pointer-events-none'
  const formTextInputStyles = 'border border-[#D0D5DD] rounded-[4px] h-11 px-[14px] py-[10px] placeholder:italic placeholder:font-normal placeholder:text-[#A4B1B8] xl:text-[14px] xl:h-[54px] xl:pt-[30px]'

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target
    setUserInfo({ ...userInfo, [name]: value })
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    setLoading(true)
    e.preventDefault()

    try {
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

  return (
    <form className='form' onSubmit={handleSubmit}>
      <div className='font-montserrat'>
        <h1 className='text-[18px] text-[#101828] font-semibold leading-[28px]'>
          Create an account
        </h1>
        <p className='text-[14px] font-medium text-[#475467] mt-[2px]'>
          Sign up with Google or an email address
        </p>
      </div>
      {error.length > 0 && (
        <p className='text-red-500 font-sm'>
          {error}
        </p>
      )}
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

      <div className='flex flex-col gap-[6px]'>
        <label
          className={formLabelStyles}
          htmlFor='email'
        >
          Email*
        </label>
        <input
          className={formTextInputStyles}
          type='email'
          name='email'
          placeholder='Email Address'
          value={email}
          onChange={handleChange}
        />
      </div>

      <div className='flex flex-col gap-[6px]'>
        <label
          className={formLabelStyles}
          htmlFor="password"
        >
          Password*
        </label>
        <input
          className={formTextInputStyles}
          type='password'
          name='password'
          placeholder='Password'
          value={password}
          onChange={handleChange}
          autoComplete='off'
        />
      </div>

      <button
        className='font-montserrat font-semibold text-[14px] leading-[24px] h-11 rounded-[4px] bg-primary text-white mt-2 xl:h-12'
        type="submit"
        disabled={loading}
        style={{ opacity: loading ? 0.5 : 1 }}
      >
        Complete Sign Up
      </button>
    </form>
  )
}

export default SignUpForm