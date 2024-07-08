import startDb from '@lib/db'
import Post from '@models/postModel'
import { NextResponse } from 'next/server'

interface NewResponse extends NextResponse {
  success?: boolean
  error?: string | null
}

export const GET = async (req: Request): Promise<NewResponse> => {
  try {
    await startDb()

    // Fetch all Posts documents start with most recent
    const allPosts = await Post.find().sort({ timestamp: -1 }).limit(25)
    console.log(allPosts)
    return NextResponse.json({
      success: true,
      data: allPosts,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      error: `${error}`,
    })
  }
}
