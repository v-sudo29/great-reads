import { NextResponse, NextRequest } from "next/server"
import crypto from 'crypto'
import User from "@models/userModel"
import startDb from "@lib/db"
import { uploadFile, getObjectSignedUrl } from "@lib/s3"

type NewResponse = NextResponse<{
  error?: string
  success?: boolean
  imageUrl?: string
  imageName?: string
}>

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

export const POST = async (req: NextRequest): Promise<NewResponse> => {
  const formData = await req.formData()

  const file: File | null = formData.get('file') as unknown as File
  const id: string | null = formData.get('id') as unknown as string

  if (!file) {
    return NextResponse.json({ success: false })
  }

  // Convert file to generic raw buffer data to buffer data
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const imageName = randomImageName()
  await uploadFile(buffer, imageName, file.type)

  // Update user image in database
  // -----------------------------
  // Find and retrieve user info
  await startDb()
  const userInfo = await User.findById(id)

  // Update database
  const updatedUser = new User({
    _id: id, 
    email: userInfo?.email,
    name: userInfo?.name,
    friends: userInfo?.friends,
    lists: userInfo?.lists,
    imageName: imageName
  })
  const result = await User.findByIdAndUpdate(id, updatedUser, {})

  // Get temporary signed url from s3
  const signedUrl = await getObjectSignedUrl(imageName)
  console.log(signedUrl)

  // Return temporary image url to client
  return NextResponse.json({
    success: true,
    imageName: imageName,
    imageUrl: signedUrl
  })
}