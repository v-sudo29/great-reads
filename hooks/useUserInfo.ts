import { useEffect, useState } from 'react'

const useUserInfo = (userId: string | null) => {
  const [userInfo, setUserInfo] = useState({
    firstName: null,
    lastName: null,
    profileImageUrl: null,
  })

  // Fetches firstName, lastName, and profileImageUrl
  useEffect(() => {
    if (
      userId &&
      !userInfo.firstName &&
      !userInfo.lastName &&
      !userInfo.profileImageUrl
    ) {
      const fetchUserProfileImage = async (userImageName: string) => {
        const response = await fetch(
          `/api/users/user/imageUrl/${userImageName}`
        )
        const data = await response.json()
        return data.imageUrl
      }

      const fetchUserInfo = async () => {
        try {
          const response = await fetch(`/api/users/user/${userId}`)
          const data = await response.json()
          const userImageUrl = await fetchUserProfileImage(data.data.imageName)

          setUserInfo({
            firstName: data.data.firstName,
            lastName: data.data.lastName,
            profileImageUrl: userImageUrl,
          })
        } catch (err) {
          console.log(err)
        }
      }

      fetchUserInfo()
    }
  }, [userId, userInfo])

  return {
    userInfo,
  }
}

export default useUserInfo
