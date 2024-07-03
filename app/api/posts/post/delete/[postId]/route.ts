import Post from '@models/postModel'
import { NextResponse } from 'next/server'

type NewResponse = NextResponse<{
  success?: boolean
  error?: string
}>

// DELETE request to delete all post instances from database
export const DELETE = async (req: Request): Promise<NewResponse> => {
  try {
    const splitUrl = req.url.split('/')
    const postId = splitUrl[splitUrl.length - 1]

    // Find all post instances in database and delete
    await Post.findOneAndDelete({ _id: postId })

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    return NextResponse.json({ error: `${error}` })
  }
}
