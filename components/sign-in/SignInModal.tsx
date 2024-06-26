import SignInForm from './SignInForm'
import { GoogleButton } from '@components/authButtons'
import ExitIcon from '@components/common/icons/ExitIcon'

const SignInModal = () => {
  return (
    <div className="absolute z-50 flex justify-center w-full h-full px-4 xl:fixed xl:top-0 xl:left-0">
      <div className="relative mt-[6.5rem] flex flex-col w-full h-max max-w-[480px] gap-3 px-4 py-5 bg-white shadow-xl rounded-xl xl:mt-auto xl:mb-auto xl:p-6">
        <a href="/" className="absolute right-[22px] top-[22px]">
          <ExitIcon />
        </a>
        <SignInForm />
        <GoogleButton>Continue with Google</GoogleButton>
        <div className="flex justify-center py-3 xl:pb-0">
          <a
            className="font-montserrat font-semibold text-[14px] text-[#212925] underline leading-[24px]"
            href={'/sign-up'}
          >
            Create New Account
          </a>
        </div>
      </div>
    </div>
  )
}

export default SignInModal
