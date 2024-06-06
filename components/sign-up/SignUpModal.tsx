import SignUpForm from "./SignUpForm"
import { GoogleButton } from "@components/authButtons"
import ExitIcon from "@components/common/icons/ExitIcon"

const SignUpModal = () => {
  return (
    <div className='absolute flex justify-center w-full h-full px-4'>
      <div className='relative mt-[6.5rem] flex flex-col w-full h-max max-w-[480px] gap-3 px-4 py-5 bg-white shadow-xl rounded-md'>
        <a 
          href='/'
          className='absolute right-[22px]'
        >
          <ExitIcon/>
        </a>
        <SignUpForm/>
        <GoogleButton>
          Continue with Google
        </GoogleButton>
      </div>
    </div>
  )
}

export default SignUpModal