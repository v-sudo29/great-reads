'use client'
import { signOut, useSession } from 'next-auth/react'
import { Button } from '@components/common/Button'
import { useEffect, useRef, useState } from 'react'
import ProfilePicture from '@components/settings/ProfilePicture'
import LogoutIcon from '@components/common/icons/LogoutIcon'
import { useRouter } from 'next/navigation'

const UPDATE_TYPES = {
  FIRST_NAME: 'First Name',
  LAST_NAME: 'Last Name',
}

export default function Settings() {
  const { data: session, update } = useSession()
  const [isFirstNameEditing, setIsFirstNameEditing] = useState(false)
  const [isLastNameEditing, setIsLastNameEditing] = useState(false)
  const firstNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleEditClick = (updateType: string) => {
    if (updateType === UPDATE_TYPES.FIRST_NAME) {
      setIsFirstNameEditing((prev) => !prev)
    }
    if (updateType === UPDATE_TYPES.LAST_NAME) {
      setIsLastNameEditing((prev) => !prev)
    }
  }

  const handleUpdate = async (updateType: string) => {
    // Update first name
    if (
      firstNameRef.current?.value &&
      firstNameRef.current?.value.replace(/\s/g, '').length &&
      updateType === UPDATE_TYPES.FIRST_NAME
    ) {
      try {
        await update({ firstName: firstNameRef.current.value })
        setIsFirstNameEditing(false)
      } catch (err) {
        console.error(err)
      }
    }

    // Update last name
    if (
      lastNameRef.current?.value &&
      lastNameRef.current?.value.replace(/\s/g, '').length &&
      updateType === UPDATE_TYPES.LAST_NAME
    ) {
      try {
        await update({ lastName: lastNameRef.current.value })
        setIsLastNameEditing(false)
      } catch (err) {
        console.error(err)
      }
    }
  }

  // If user not logged in, redirect to login page
  useEffect(() => {
    if (session === null) router.push('/sign-in')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  if (session === undefined) return <></>
  if (session === null) return <></>

  const firstName = session.user.firstName
  const lastName = session.user.lastName
  const email = session.user.email

  const labelStyles =
    'font-bold text-[14px] text-primary leading-[28px] xl:text-[18px]'
  const detailStyles =
    'font-montserrat font-semibold leading-[24px] text-[#707070] xl:text-xl xl:mt-1'
  const editButtonStyles =
    'text-primary font-semibold text-[14px] leading-[28px] xl:text-[18px]'
  const textInputStyles =
    'border border-[#D0D5DD] rounded-[4px] font-montserrat font-semibold text-[#707070] leading-[24px] h-12 w-full px-[14px] py-[10px] mt-2 transition-[outline] focus:outline-none focus:outline-offset-[-1.5px] focus:outline-[1.5px] focus:outline-[#4285F4] placeholder:font-normal placeholder:text-[#A4B1B8] xl:text-xl xl:h-[54px]'

  return (
    <div className="py-8 px-3 w-full xl:py-[112px] xl:px-[108px]">
      {/* PROFILE PIC and INFO */}
      <div className="flex gap-5 items-center mb-10 xl:gap-10">
        <ProfilePicture />
        <div>
          <h1 className="font-lora font-bold text-xl text-primary xl:text-[32px]">
            {`${firstName} ${lastName}` ?? ''}
          </h1>
          <p className="font-montserrat font-medium text-[14px] text-primary xl:text-xl xl:leading-[32px] xl:mt-2">
            {session.user.email ?? ''}
          </p>
        </div>
      </div>

      {/* MY DETAILS */}
      <div className="flex flex-col">
        <h2 className="font-lora font-bold text-[18px] text-primary xl:text-[24px] xl:mb-[6px]">
          My Details
        </h2>
        <div className="border-b border-b-[#DFE7EB] py-4 xl:py-6">
          <div className="flex justify-between font-montserrat">
            <h3 className={labelStyles}>
              {isFirstNameEditing && 'Edit'} First Name
            </h3>
            <button
              className={editButtonStyles}
              onClick={() => handleEditClick(UPDATE_TYPES.FIRST_NAME)}
            >
              {isFirstNameEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>
          {!isFirstNameEditing && <p className={detailStyles}>{firstName}</p>}
          {isFirstNameEditing && (
            <>
              <input
                ref={firstNameRef}
                type="text"
                className={textInputStyles}
                defaultValue={firstName}
                autoFocus
              />
              <Button
                type="primary"
                bordersRounded={true}
                clickHandler={() => handleUpdate(UPDATE_TYPES.FIRST_NAME)}
                className="mt-4"
              >
                Save Update
              </Button>
            </>
          )}
        </div>
        <div className="border-b border-b-[#DFE7EB] py-4 xl:py-6">
          <div className="flex justify-between font-montserrat">
            <h3 className={labelStyles}>
              {isLastNameEditing && 'Edit'} Last Name
            </h3>
            <button
              className={editButtonStyles}
              onClick={() => handleEditClick(UPDATE_TYPES.LAST_NAME)}
            >
              {isLastNameEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>
          {!isLastNameEditing && <p className={detailStyles}>{lastName}</p>}
          {isLastNameEditing && (
            <>
              <input
                ref={lastNameRef}
                type="text"
                className={textInputStyles}
                defaultValue={lastName}
                autoFocus
              />
              <Button
                type="primary"
                bordersRounded={true}
                clickHandler={() => handleUpdate(UPDATE_TYPES.LAST_NAME)}
                className="mt-4"
              >
                Save Update
              </Button>
            </>
          )}
        </div>
        <div className="border-b border-b-[#DFE7EB] py-4 xl:py-6">
          <div className="flex justify-between font-montserrat">
            <h3 className={labelStyles}>Email Address</h3>
            <button className={editButtonStyles}>Edit</button>
          </div>
          <p className={detailStyles}>{email}</p>
        </div>
      </div>

      {/* LOG OUT */}
      <Button
        type="primary"
        bordersRounded={true}
        icon={<LogoutIcon />}
        clickHandler={() => signOut()}
        className="w-full justify-center mt-12 xl:w-max"
      >
        Log Out
      </Button>
    </div>
  )
}
