import startDb from '@lib/db'
import User from '@models/userModel'
import GoogleUser from '@models/googleUserModel'
import { NextResponse } from 'next/server'
import { SchemaDefinitionProperty } from 'mongoose'
import { IBook } from '@customTypes/bookType'

interface NewUserRequest {
  firstName: string
  lastName: string
  email: string
  password: string
}

interface NewUserResponse {
  id: string
  firstName: string
  lastName: string
  email: string
  lists:
    | Record<
        string,
        {
          color: string
          books: IBook[]
        }
      >
    | {}
  friends: SchemaDefinitionProperty[] | []
  imageName: string | null
}

type NewResponse = NextResponse<{ user?: NewUserResponse; error?: string }>

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

  const user = await User.create({ ...body })
  console.log('SIGN UP ROUTE: ', user)
  return NextResponse.json({
    user: {
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      lists: {
        Read: {
          color: '59BC99',
          books: [],
        },
        'Currently Reading': {
          color: '745DFF',
          books: [],
        },
        'Want to Read': {
          color: 'FBB246',
          books: [],
        },
      },
      friends: [],
      imageName: null,
    },
  })
}
