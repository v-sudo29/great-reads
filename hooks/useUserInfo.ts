import { useEffect, useState } from 'react'

const useUserInfo = (userId: string | null) => {
  const [userInfo, setUserInfo] = useState({
    firstName: null,
    lastName: null,
    profileImageUrl: null,
  })
  const [userImageName, setUserImageName] = useState<string | null>(null)

  // Fetches firstName, lastName, and userImageName
  useEffect(() => {
    if (
      userId &&
      !userInfo.firstName &&
      !userInfo.lastName &&
      !userInfo.profileImageUrl
    ) {
      const fetchUserInfo = async () => {
        try {
          const response = await fetch(`/api/users/user/${userId}`)
          const data = await response.json()

          setUserInfo({
            firstName: data.data.firstName,
            lastName: data.data.lastName,
            profileImageUrl: null,
          })
          setUserImageName(data.data.imageName)
        } catch (err) {
          console.log(err)
          throw new Error('Failed to fetch user information')
        }
      }
      fetchUserInfo()
    }
  }, [userId, userInfo])

  // Fetches profile image url
  useEffect(() => {
    if (userId && userImageName && !userInfo.profileImageUrl) {
      const fetchUserProfileImage = async () => {
        try {
          const response = await fetch(`/api/users/user/imageUrl`, {
            method: 'POST',
            body: JSON.stringify({
              imageName: userImageName,
            }),
          })
          const data = await response.json()
          setUserInfo((prev) => ({
            ...prev,
            profileImageUrl: data.imageUrl,
          }))
        } catch (err) {
          console.log(err)
        }
      }
      fetchUserProfileImage()
    }
  }, [userId, userImageName, userInfo.profileImageUrl])

  return {
    userInfo,
  }
}

export default useUserInfo
