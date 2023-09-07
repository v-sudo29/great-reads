'use client'
import { createContext, useContext, ReactNode, useState, useEffect } from "react"
import { useSession } from "next-auth/react"

interface IProfileImageContext {
  imageUrl: string | null | undefined
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>
  loading: boolean
}

const ProfileImageContext = createContext<IProfileImageContext>({} as IProfileImageContext)

export const useProfileImage = () => {
  return useContext(ProfileImageContext)
}

export const ProfileImageProvider = ({ children } : { children: ReactNode }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const { data: session } = useSession()

  // GET request to get temporary signed image url from s3
  const fetchImage = async () => {
    try {
      const res = await fetch('/api/users/user/imageUrl', {
        method: 'POST',
        body: JSON.stringify({ imageName: session && session.user.imageName})
      })
      const data = await res.json()
      if (data.success && data.imageUrl) setImageUrl(data.imageUrl)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (session && session.user.imageName) {
      setLoading(true)
      fetchImage()
    } else if (session && !session.user.imageName) {
      setLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user.imageName])

  const userObject = { imageUrl, setImageUrl, loading }

  return (
    <ProfileImageContext.Provider value={userObject}>
      {children}
    </ProfileImageContext.Provider>
  )
}