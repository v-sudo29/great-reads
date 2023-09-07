import { NextResponse } from "next/server"
import { getObjectSignedUrl } from "@lib/s3"

interface NewRequest {
  imageName: string
}

type NewResponse = NextResponse<{
  success?: boolean
  imageUrl?: string
  error?: string
}>

// POST request to get temporary signed url from s3
export const POST = async (req: Request): Promise<NewResponse> => {
  try {
    const body = await req.json() as NewRequest
    const imageName = body.imageName
  
    // Retrieve url from s3
    const url = await getObjectSignedUrl(imageName)

    return NextResponse.json({
      success: true,
      imageUrl: url
    })
  } catch (error) {
    return NextResponse.json({ error: `${error}`})
  }
}