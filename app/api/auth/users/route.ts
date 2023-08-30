import startDb from "@lib/db"
import User from "@models/userModel"
import GoogleUser from "@models/googleUserModel"
import { NextResponse } from "next/server"

interface NewUserRequest {
  name: string
  email: string
  password: string
}

interface NewUserResponse {
  id: string
  name: string
  email: string
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
  return NextResponse.json({
    user: {
      id: user._id.toString(),
      email: user.email,
      name: user.name
    }
  })
}