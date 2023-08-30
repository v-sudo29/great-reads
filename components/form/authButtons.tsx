import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"

export const GoogleButton = ({ loading, text } : { loading: boolean, text: string }) => {
  const handleClick = async () => {
    await signIn('google', { redirect: true, callbackUrl: 'http://localhost:3000/' })
  }

  return (
    <button
      onClick={handleClick}
      className='rounded-md py-2 my-2 w-full text-sm flex justify-center items-center gap-2 border border-slate-300
        hover:border-blue-950 transition-all'
      disabled={loading}
      style={{ opacity: loading ? 0.5 : 1 }}
    >
      <FcGoogle size={21}/>
      <p>{text}</p>
    </button>
  )
}