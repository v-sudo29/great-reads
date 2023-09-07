'use client'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import React from "react"
import { useUser } from "@context/userContext"

const Profile = () => {
  const [file, setFile] = useState<File | null>(null)
  const updateNameRef = useRef<HTMLInputElement>(null)
  const { data: session, update } = useSession()
  const router = useRouter()
  const { imageUrl, setImageUrl } = useUser()
  
  useEffect(() => {
    if (session === null) router.push('/')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  const handleUpdate = async () => {
    // Check if input value is not empty
    if (updateNameRef.current?.value && updateNameRef.current?.value.replace(/\s/g, '').length) {
      update({ name: updateNameRef.current.value })
    }
  }

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (file && session && session.user && session.user.email) {
      const formData = new FormData()

      formData.append('file', file)
      formData.append('id', session.user.id)

      // Send form data
      try {
        const res = await fetch('/api/auth/profile/upload', {
          method: 'POST',
          body: formData
        })
        const data = await res.json()
        if (data.success && data.imageName) {
          // Update session imageName property
          update({
            imageName: data.imageName
          })

          // Update userContext imageUrl
          setImageUrl(data.imageUrl)
        }

      } catch (error) {
        console.log(error)
      }
    }
  }

  if (session === undefined) return <></>
  if (session) return (
    <div className='flex flex-col items-center p-2'>
      <h1 className='page_heading'><b>{session.user ? `${session.user.name}'s` : 'my'}</b> profile</h1>
      <Image
        className='mt-5'
        src={session.user?.imageName && imageUrl ? `${imageUrl}` : '/../default-profile-pic.svg'}
        priority={true}
        alt='Profile picture'
        width={100}
        height={40}
      />
      <div className='flex flex-col gap-4 mt-10'>
        {/* Update full name */}
        <div>
          <label>Update Name</label>
          <input ref={updateNameRef} className="text_field" type="text" defaultValue={session.user!.name ?? ''}/>
          <button
            className='general_blue_button mt-2'
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
        {/* Update profile picture */}
        <div>
          <h1 className='page_secondary_heading'>Change Profile Picture</h1>
          <form action="" onSubmit={(e) => handleUpload(e)}>
            <input onChange={e => setFile(e.target.files && e.target.files[0])} type="file" accept="image/*" />
            <button className='general_button'>Upload</button>
          </form>
        </div>
      </div>
    </div>
  )
  return <></>
}

export default Profile