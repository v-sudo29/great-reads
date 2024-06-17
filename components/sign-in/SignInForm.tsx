'use client'
import { signIn } from 'next-auth/react'
import { ChangeEventHandler, MouseEventHandler, useState } from 'react'

const SignInForm = () => {
  const [error, setError] = useState('') // TODO: set general error - invalid email/password
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  })
  const { email, password } = userInfo

  const formLabelStyles =
    'font-montserrat font-medium text-[14px] text-[#344054] xl:text-[12px] xl:text-base xl:pointer-events-none'
  const formTextInputStyles =
    'border border-[#D0D5DD] rounded-[4px] h-12 px-[14px] py-[10px] focus:outline-none focus:outline-offset-[-1.5px] focus:outline-[1.5px] focus:outline-[#4285F4] placeholder:font-normal placeholder:text-[#A4B1B8] xl:text-base xl:h-[54px]'
  const formInputErrorStyles =
    'border-[1.5px] border-[#D23B2E] rounded-[4px] h-12 px-[14px] py-[10px] focus:outline-none focus:outline-offset-[-1.5px] focus:outline-[1.5px] focus:outline-[#D23B2E] placeholder:font-normal placeholder:text-[#A4B1B8] xl:text-base xl:h-[54px]'

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target

    if (name === 'email' && value !== '' && emailError) setEmailError(false)
    if (name === 'password' && value !== '' && passwordError)
      setPasswordError(false)
    setUserInfo({ ...userInfo, [name]: value })
  }

  const handleValidation = () => {
    let isError = false

    // Email validation
    if (email === '') {
      setEmailError(true)
      isError = true
    }

    // Password validation
    if (password === '') {
      setPasswordError(true)
      isError = true
    }

    return isError
  }

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()
    const hasError = handleValidation()

    if (hasError) return

    try {
      setLoading(true)
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })
      if (res?.error) setError(res.error) // TODO: set general error - invalid email/password
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  return (
    <form className="flex flex-col w-full rounded-md">
      <div className="font-montserrat mb-5">
        <h1 className="text-[18px] text-[#101828] font-semibold leading-[28px]">
          Sign In
        </h1>
      </div>
      <div className="flex flex-col gap-6 mb-8">
        <div className="relative flex flex-col gap-[6px]">
          <label className={formLabelStyles} htmlFor="email">
            Email Address*
          </label>
          <input
            className={emailError ? formInputErrorStyles : formTextInputStyles}
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={handleChange}
          />
          {emailError && (
            <span className="absolute font-montserrat font-semibold bottom-[-21px] text-[12px] text-[#D23B2E]">
              Please enter a valid email address
            </span>
          )}
        </div>

        <div className="relative flex flex-col gap-[6px]">
          <label className={formLabelStyles} htmlFor="password">
            Password*
          </label>
          <input
            className={
              passwordError ? formInputErrorStyles : formTextInputStyles
            }
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="off"
            value={password}
            onChange={handleChange}
          />
          {passwordError && (
            <span className="absolute font-montserrat font-semibold bottom-[-21px] text-[12px] text-[#D23B2E]">
              Please enter a valid password
            </span>
          )}
        </div>
      </div>
      <button
        className="font-montserrat font-semibold text-[14px] leading-[24px] h-11 rounded-[4px] bg-primary text-white xl:h-12 xl:text-base"
        type="submit"
        disabled={loading}
        style={{ opacity: loading ? 0.5 : 1 }}
        onClick={handleSubmit}
      >
        Log In
      </button>
    </form>
  )
}

export default SignInForm
