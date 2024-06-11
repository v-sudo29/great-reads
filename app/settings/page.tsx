'use client'
import { useProfileImage } from "@context/ProfileImageProvider"
import { signOut, useSession } from 'next-auth/react'
import { Button } from "@components/common/Button"
import { useEffect, useState } from "react"
import LogoutIcon from "@components/common/icons/LogoutIcon"
import Image from "next/image"
import router from "next/router"

export default function Settings() {
  const { data: session, update } = useSession()
  const { imageUrl, setImageUrl, loading } = useProfileImage()
  const [file, setFile] = useState<File | null>(null)
  const [isProfileHovered, setIsProfileHovered] = useState(false)

  // If user not logged in, redirect to login page
  useEffect(() => {
    if (session === null) router.push('/sign-in')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  // Handles file upload if file state changes
  useEffect(() => {
    if (file) {
      const handleUpload = async () => {
        if (file && session && session.user && session.user.email) {
          const formData = new FormData()

          formData.append('file', file)
          formData.append('id', session.user.id)

          // Send form data
          try {
            const res = await fetch('/api/profile/upload', {
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
      handleUpload()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file])

  if (session === undefined) return <></>
  if (session === null) return <></>
  
  const firstName = session.user.firstName
  const lastName = session.user.lastName
  const email = session.user.email
  
  const labelStyles = 'font-bold text-[14px] text-primary leading-[28px] xl:text-[18px]'
  const detailStyles = 'font-montserrat font-semibold leading-[24px] text-[#707070] xl:text-xl xl:mt-1'
  const editButtonStyles = 'text-primary font-semibold text-[14px] leading-[28px] xl:text-[18px]'

  return (
    <div className='py-8 px-3 w-full xl:py-[112px] xl:px-[108px]'>
      {/* PROFILE PIC and INFO */}
      <div className='flex gap-5 items-center mb-10 xl:gap-10'>
        <div className='relative border w-[104px] h-[104px] rounded-full overflow-hidden'>
          <Image
            className='w-full min-w-full scale-150 h-auto'
            src={              
              // If user has imageName -- display imageUrl
              (session.user.imageName && imageUrl) ? `${imageUrl}` :
              // Else if user has defaultImage -- display defaultImage
              session.user.defaultImage ? `${session.user.defaultImage}` :
              // Else if user has none, display default profile pic
              '/../default-profile-pic.svg'
            }
            alt=''
            width='104'
            height='104'
          />
          {isProfileHovered && (
            <>
              <div className='absolute z-20 flex top-0 w-full h-full bg-black opacity-50'></div>
              <p className='absolute z-20 flex top-0 w-full h-full justify-center items-center text-white'>
                Update
              </p>
            </>
          )}
          <input
            className='absolute top-[-50px] z-20 left-0 w-full h-[calc(100%_+_50px)] cursor-pointer'
            onChange={(e) => setFile(e.target.files && e.target.files[0])}
            onMouseEnter={() => setIsProfileHovered(true)}
            onMouseLeave={() => setIsProfileHovered(false)}
            type='file'
            accept="image/*"
          />
        </div>
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

      {/* LOG OUT */}
      <Button
        type='primary'
        bordersRounded={true}
        icon={<LogoutIcon/>}
        clickHandler={() => signOut()}
        className='w-full justify-center mt-12'
      >
        Log Out
      </Button>
    </div>
  )
}