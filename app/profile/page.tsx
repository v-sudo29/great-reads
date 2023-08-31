'use client'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import Image from "next/image"

const Profile = () => {
  const updateNameRef = useRef<HTMLInputElement>(null)
  const { data: session, update } = useSession()
  const router = useRouter()
  
  useEffect(() => {
    if (session === null) router.push('/')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  console.log(session?.user)

  const handleUpdate = async () => {
    // Check if input value is not empty
    if (updateNameRef.current?.value && updateNameRef.current?.value.replace(/\s/g, '').length) {
      update({ name: updateNameRef.current.value })
    }
  }

  if (session === undefined) return <></>
  if (session) return (
    <div className='flex flex-col items-center'>
      <h1>This is {session.user ? `${session.user.name}'s` : 'my'} profile!</h1>
      <Image
        className='mt-5 border border-black'
        src={`${session.user?.image}`}
        priority={true}
        alt='Profile picture'
        width={100}
        height={40}
      />
      <div className='mt-10'>
        <label htmlFor="updateName">Update Name</label>
        <input ref={updateNameRef} className="text_field" type="text" defaultValue={session.user!.name ?? ''}/>
        <button
          className='bg-blue-950 px-6 py-3 mt-5 text-white font-medium rounded-full'
          onClick={handleUpdate}
        >
          Update
        </button>
      </div>
    </div>
  )
  return <></>
}

export default Profile