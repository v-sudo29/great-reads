import { NextResponse } from 'next/server'
import { getObjectSignedUrl } from '@lib/s3'

type NewResponse = NextResponse<{
  success?: boolean
  imageUrl?: string
  error?: string
}>

// GET request to get temporary signed url from s3
export const GET = async (req: Request): Promise<NewResponse> => {
  try {
    const splitUrl = req.url.split('/')
    const imageName = splitUrl[splitUrl.length - 1]

    // Retrieve url from s3
    const url = await getObjectSignedUrl(imageName)

    return NextResponse.json({
      success: true,
      imageUrl: url,
    })
  } catch (error) {
    return NextResponse.json({ error: `${error}` })
  }
}
