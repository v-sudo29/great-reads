'use client'
import { createContext, useContext, ReactNode, useState } from "react"

interface IUserContext {
  imageUrl: string | null
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>
}

const UserContext = createContext<IUserContext>({} as IUserContext)

export const useUser = () => {
  return useContext(UserContext)
}

export const UserProvider = ({ children } : { children: ReactNode }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const userObject = { imageUrl, setImageUrl }

  return (
    <UserContext.Provider value={userObject}>
      {children}
    </UserContext.Provider>
  )
}