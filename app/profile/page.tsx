'use client'
import { useSession } from 'next-auth/react'
import ProfilePicture from '@components/settings/ProfilePicture'
import GreenDotIcon from '@components/common/icons/GreenDotIcon'

const Profile = () => {
  const { data: session } = useSession()

  if (session === undefined) return <></>
  if (session === null) return <></>

  return (
    <div className="w-full">
      {/* Profile Banner */}
      <div className="bg-gray-300 w-full h-[134px]"></div>

      {/* User Profile Pic */}
      <div className="relative flex justify-center mt-[-50px]">
        <ProfilePicture />
      </div>

      {/* User Details */}
      <div className="flex flex-col items-center h-[160px] mt-4">
        <h1 className="font-lora font-bold text-xl text-primary leading-[28px]">
          {`${session.user.firstName} ${session.user.lastName}`}
        </h1>
        <div className="flex items-center gap-2 font-montserrat font-medium text-[14px] text-primary">
          <p>
            <span className="font-bold">56</span>
            &nbsp;Followers
          </p>
          <GreenDotIcon />
          <p>
            <span className="font-bold">3</span>
            &nbsp;Following
          </p>
        </div>
      </div>
    </div>
  )
}

export default Profile
