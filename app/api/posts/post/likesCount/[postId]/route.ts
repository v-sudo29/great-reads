import Post from '@models/postModel'
import { NextResponse } from 'next/server'

type NewResponse = NextResponse<{
  success?: boolean
  error?: string
}>

// POST request to update likesCount of a post
export const POST = async (req: Request): Promise<NewResponse> => {
  try {
    const splitUrl = req.url.split('/')
    const postId = splitUrl[splitUrl.length - 1]
    const body = await req.json()

    // Find post and increment likesCount
    if (body.action === 'increment') {
      await Post.findOneAndUpdate({ _id: postId }, { $inc: { likesCount: 1 } })
    }
    if (body.action === 'decrement') {
      await Post.findOneAndUpdate({ _id: postId }, { $inc: { likesCount: -1 } })
    }

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    return NextResponse.json({ error: `${error}` })
  }
}
