import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"

export const GoogleButton = ({ loading } : { loading: boolean }) => {
  const handleClick = () => {
    signIn('google', { callbackUrl: '/' })
  }

  return (
    <button
      onClick={handleClick}
      className='sign_in_button w-full flex justify-center items-center gap-2 border border-slate-300
        hover:border-blue-950 transition-all'
      disabled={loading}
      style={{ opacity: loading ? 0.5 : 1 }}
    >
      <FcGoogle size={21}/>
      <p>Sign in with Google</p>
    </button>
  )
}