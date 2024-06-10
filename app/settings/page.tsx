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
  
  const labelStyles = 'font-bold text-[14px] text-primary leading-[28px] xl:text-[18px]'
  const detailStyles = 'font-montserrat font-semibold leading-[24px] text-[#707070] xl:text-xl'
  const editButtonStyles = 'text-primary font-semibold text-[14px] leading-[28px] xl:text-[18px]'

  return (
    <div className='py-8 px-3 w-full xl:py-[112px] xl:px-[108px]'>
      {/* PROFILE PIC and INFO */}
      <div className='flex gap-5 items-center mb-10 xl:gap-10'>
        <Image
          className='xl:w-[160px] xl:h-[160px]'
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
          <h1 className='font-lora font-bold text-xl text-primary xl:text-[32px]'>
            {`${firstName} ${lastName}` ?? ''}
          </h1>
          <p className='font-montserrat font-medium text-[14px] text-primary xl:text-xl xl:leading-[32px] xl:mt-2'>
            {session.user.email ?? ''}
          </p>
        </div>
      </div>

      {/* MY DETAILS */}
      <div className='flex flex-col'>
        <h2 className='font-lora font-bold text-[18px] text-primary xl:text-[28px] xl:mb-[6px]'>
          My Details
        </h2>
        <div className='border-b border-b-[#DFE7EB] py-4 xl:py-6'>
          <div className='flex justify-between font-montserrat'>
            <h3 className={labelStyles}>
              First Name
            </h3>
            <button className={editButtonStyles}>
              Edit
            </button>
          </div>
          <p className={detailStyles}>
            {firstName}
          </p>
        </div>
        <div className='border-b border-b-[#DFE7EB] py-4 xl:py-6'>
          <div className='flex justify-between font-montserrat'>
            <h3 className={labelStyles}>
              Last Name
            </h3>
            <button className={editButtonStyles}>
              Edit
            </button>
          </div>
          <p className={detailStyles}>
            {lastName}
          </p>
        </div>
        <div className='border-b border-b-[#DFE7EB] py-4 xl:py-6'>
          <div className='flex justify-between font-montserrat'>
            <h3 className={labelStyles}>
              Email Address
            </h3>
            <button className={editButtonStyles}>
              Edit
            </button>
          </div>
          <p className={detailStyles}>
            {email}
          </p>
        </div>
      </div>
    </div>
  )
}