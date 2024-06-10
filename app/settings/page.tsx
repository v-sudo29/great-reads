'use client'
import { useProfileImage } from "@context/ProfileImageProvider"
import { useSession } from 'next-auth/react'
import Image from "next/image"

export default function Settings() {
  const { data: session } = useSession()
  const { imageUrl, loading } = useProfileImage()

  if (session === undefined) return <></>
  if (session === null) return <></>

  const firstName = session.user.firstName
  const lastName = session.user.lastName
  const email = session.user.email

  return (
    <div className='py-8 px-3 w-full'>
      {/* PROFILE PIC and INFO */}
      <div className='flex gap-5 items-center mb-10'>
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
          <h1 className='font-lora font-bold text-xl text-primary'>
            {`${firstName} ${lastName}` ?? ''}
          </h1>
          <p className='font-montserrat font-medium text-[14px] text-primary'>
            {session.user.email ?? ''}
          </p>
        </div>
      </div>

      {/* MY DETAILS */}
      <div className='flex flex-col'>
        <h2 className='font-lora font-bold text-[18px] text-primary'>
          My Details
        </h2>
        <div className='border-b border-b-[#DFE7EB] py-4'>
          <div className='flex justify-between font-montserrat'>
            <h3 className='font-bold text-[14px] text-primary leading-[28px]'>
              First Name
            </h3>
            <button className='text-primary font-semibold text-[14px] leading-[28px]'>
              Edit
            </button>
          </div>
          <p className='font-montserrat font-semibold leading-[24px] text-[#707070]'>
            {firstName}
          </p>
        </div>
        <div className='border-b border-b-[#DFE7EB] py-4'>
          <div className='flex justify-between font-montserrat'>
            <h3 className='font-bold text-[14px] text-primary leading-[28px]'>
              Last Name
            </h3>
            <button className='text-primary font-semibold text-[14px] leading-[28px]'>
              Edit
            </button>
          </div>
          <p className='font-montserrat font-semibold leading-[24px] text-[#707070]'>
            {lastName}
          </p>
        </div>
        <div className='border-b border-b-[#DFE7EB] py-4'>
          <div className='flex justify-between font-montserrat'>
            <h3 className='font-bold text-[14px] text-primary leading-[28px]'>
              Email Address
            </h3>
            <button className='text-primary font-semibold text-[14px] leading-[28px]'>
              Edit
            </button>
          </div>
          <p className='font-montserrat font-semibold leading-[24px] text-[#707070]'>
            {email}
          </p>
        </div>
      </div>
    </div>
  )
}