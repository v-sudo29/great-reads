import startDb from "@lib/db"
import User from "@models/userModel"
import GoogleUser from "@models/googleUserModel"
import { NextResponse } from "next/server"
import { SchemaDefinitionProperty } from "mongoose"

interface FriendsResponse {
  _id?: string
  id: string
  name: string
  lists: Record<string, string[]> | {}
  friends?: SchemaDefinitionProperty[] | []
}

interface FriendsRequest extends Request {
  id: string
}


type NewResponse = NextResponse<{friends?: FriendsResponse[]; error?: string;}>

// TODO: implement for Google users
export const POST = async (req: Request): Promise<NewResponse> => {

  try {
    const body = (await req.json()) as FriendsRequest

    // Search for user in database
    await startDb()

      // Find user and retrieve credential friends
      const foundUser = await User.findById(body.id)
        .populate({
          path: 'friends',
          model: 'User'
        })
        .catch(error => console.log(error))
      
      // Retrieve Google friends
      const foundUserAgain: typeof foundUser = await User.findById(body.id)
        .populate({
          path: 'friends',
          model: 'GoogleUser'
        })
        .catch(error => console.log(error))

    // Retrieve friends array from user
    const friendsArr: FriendsResponse[] = []

    if (foundUser) {
      (foundUser.friends as FriendsResponse[]).forEach(friend => {
        friendsArr.push({
          id: friend._id ?? '',
          name: friend.name,
          lists: friend.lists
        })
      })
    }
    if (foundUserAgain) {
      (foundUserAgain.friends as FriendsResponse[]).forEach(friend => {
        friendsArr.push({
          id: friend._id ?? '',
          name: friend.name,
          lists: friend.lists
        })
      })
    }

    return NextResponse.json({
      friends: [
        ...friendsArr
      ]
    })

  } catch (error) {
    console.log(error)
    return NextResponse.json({
      error: `${error}`
    })
  }
}