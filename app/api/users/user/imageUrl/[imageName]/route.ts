import { NextResponse } from 'next/server'
import { getObjectSignedUrl } from '@lib/s3'

type NewResponse = NextResponse<{
  success?: boolean
  imageUrl?: string
  error?: string
}>

// POST request to get temporary signed url from s3
export const GET = async (req: Request): Promise<NewResponse> => {
  try {
    const pathNameSplit = new URL(req.url ?? '').pathname.split('/')
    const imageName = pathNameSplit[pathNameSplit.length - 1]

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
