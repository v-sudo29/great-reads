import SignUpForm from "./SignUpForm"
import { GoogleButton } from "@components/authButtons"
import ExitIcon from "@components/common/icons/ExitIcon"
import { useState } from "react"

const SignUpModal = () => {
  const [stepNumber, setStepNumber] = useState(1)
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })

  const handleReset = () => {
    setStepNumber(1)
    setUserInfo({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    })
  }

  return (
    <div className='absolute flex justify-center w-full h-full px-4 xl:fixed xl:top-0 xl:left-0'>
      <div className='relative mt-[6.5rem] flex flex-col w-full h-max max-w-[480px] gap-3 px-4 py-5 bg-white shadow-xl rounded-xl xl:mt-auto xl:mb-auto xl:p-6'>
        <a 
          href='/'
          className='absolute right-[22px] top-[22px]'
        >
          <ExitIcon/>
        </a>
        <SignUpForm
          userInfo={userInfo}
          stepNumber={stepNumber}
          setUserInfo={setUserInfo}
          setStepNumber={setStepNumber}
        />
        {stepNumber === 1 && (
          <>
            <GoogleButton>
              Continue with Google
            </GoogleButton>
            <div className='flex justify-center py-3 xl:pb-0'>
              <a
                className='font-montserrat font-semibold text-[14px] text-[#212925] underline leading-[24px]'
                href={"/sign-in"}
              >
                I already have an account!
              </a>
            </div>
          </>
        )}
        {stepNumber === 2 && (
          <div className='flex justify-center py-3 xl:pb-0'>
            <button
              className='font-montserrat font-semibold text-[14px] text-[#212925] underline leading-[24px]'
              onClick={handleReset} // TODO: lift userInfo state from SignUpForm component to allow reset
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SignUpModal