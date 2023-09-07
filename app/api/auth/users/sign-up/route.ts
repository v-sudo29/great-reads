import startDb from "@lib/db"
import User from "@models/userModel"
import GoogleUser from "@models/googleUserModel"
import { NextResponse } from "next/server"
import { SchemaDefinitionProperty } from "mongoose"

interface NewUserRequest {
  name: string
  email: string
  password: string
}

interface NewUserResponse {
  id: string
  name: string
  email: string
  lists: Record<string, string[]> | {}
  friends: SchemaDefinitionProperty[] | [],
  imageName: string | null
}

type NewResponse = NextResponse<{user?: NewUserResponse; error?: string}>

export const POST = async (req: Request): Promise<NewResponse> => {
  const body = (await req.json()) as NewUserRequest

  await startDb()
  const emailExists = await User.findOne({ email: body.email })
  const googleEmailExists = await GoogleUser.findOne({ email: body.email })

  if (emailExists || googleEmailExists) {
    return NextResponse.json(
      { error: 'Email is already in use' },
      { status: 422 }
    )
  }
  
  const user = await User.create({...body })
  console.log('SIGN UP ROUTE: ', user)
  return NextResponse.json({
    user: {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      lists: {
        ['Read']: [],
        ['Currently Reading']: [],
        ['Want to Read']: []
      },
      friends: [],
      imageName: null
    }
  })
}