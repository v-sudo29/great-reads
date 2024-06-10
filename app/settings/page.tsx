'use client'
import { useProfileImage } from "@context/ProfileImageProvider"
import { useSession } from 'next-auth/react'
import Image from "next/image"

export default function Settings() {
  const { data: session } = useSession()
  const { imageUrl, loading } = useProfileImage()
  
  if (session === undefined) return <></>
  if (session === null) return <></>

  return (
    <div className='py-8 px-3 w-full border'>
      {/* PROFILE PIC and INFO */}
      <div className='flex gap-5 items-center'>
        <Image
          src={                  
            // If user has imageName -- display imageUrl
            (session.user.imageName && imageUrl) ? `${imageUrl}` :
            // Else if user has defaultImage -- display defaultImage
              session.user.defaultImage ? `${session.user.defaultImage}` :
            // Else if user has none, display default profile pic
               '/../default-profile-pic.svg'}
          alt=''
          width='104'
          height='104'
        />
        <div>
          <p className='font-lora font-bold text-xl text-primary'>
            {session.user.name ?? ''}
          </p>
          <p className='font-montserrat font-medium text-[14px] text-primary'>
            {session.user.email ?? ''}
          </p>
        </div>
      </div>
    </div>
  )
}