import startDb from "@lib/db"
import User from "@models/userModel"
import GoogleUser from "@models/googleUserModel"
import { NextResponse } from "next/server"
import { SchemaDefinitionProperty } from "mongoose"

interface UserResponse {
  id: string
  name: string
  lists: Record<string, string[]> | {}
  friends?: SchemaDefinitionProperty[] | []
}

type NewResponse = NextResponse<{error?: string; users?: UserResponse[]}>

export const GET = async (req: Request): Promise<NewResponse> => {
  try {
    await startDb()
    const allUsers = await User.find({})
    const allGoogleUsers = await GoogleUser.find({})
  
    const usersArr: UserResponse[] = []
    const googleUsersArr: UserResponse[] = []
  
    allUsers.forEach(user => {
      usersArr.push({
        id: user._id,
        name: user.name,
        lists: user.lists,
        friends: user.friends
      })
    })
  
    allGoogleUsers.forEach(user => {
      googleUsersArr.push({
        id: user._id,
        name: user.name,
        lists: user.lists,
        friends: user.friends
      })
    })
    
    return NextResponse.json({
      users: [
        ...usersArr,
        ...googleUsersArr
      ]
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      error: `${error}`
    })
  }
  
}