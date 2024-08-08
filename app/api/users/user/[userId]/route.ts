import startDb from '@lib/db'
import User from '@models/userModel'
import { NextResponse } from 'next/server'

interface NewResponse extends NextResponse {
  success: boolean
  data: {
    firstName: string
    lastName: string
    imageName: string
  }
}

interface ErrorResponse extends NextResponse {
  error: string
}

export const GET = async (
  req: Request
): Promise<NewResponse | ErrorResponse> => {
  try {
    await startDb()
    const pathNameSplit = new URL(req.url ?? '').pathname.split('/')
    const userId = pathNameSplit[pathNameSplit.length - 1]
    const userFound = await User.findOne({ _id: userId })

    const responseObject = {
      firstName: userFound?.firstName,
      lastName: userFound?.lastName,
      imageName: userFound?.imageName,
    }

    return NextResponse.json({
      success: true,
      data: responseObject,
    }) as NewResponse
  } catch (err) {
    return NextResponse.json({
      error: `${err}`,
    }) as ErrorResponse
  }
}
