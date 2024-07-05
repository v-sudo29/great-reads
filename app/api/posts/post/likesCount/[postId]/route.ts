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

    // Find post and increment likesCount
    const retrievedPost = await Post.find({ _id: postId })
    if (retrievedPost) {
      await Post.findOneAndUpdate({ _id: postId }, { $inc: { likesCount: 1 } })
    } else {
      throw new Error('Post does not exist')
    }

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    return NextResponse.json({ error: `${error}` })
  }
}
