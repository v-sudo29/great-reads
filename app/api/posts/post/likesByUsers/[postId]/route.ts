import Post from '@models/postModel'
import User from '@models/userModel'
import { NextResponse } from 'next/server'
import convertToObjectId from '@lib/convertToObjectId'

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
    const userId = body.userId
    const action = body.action

    // Check if post and user exists
    const postExists = await Post.find({ _id: postId })
    const userExists = await User.find({ _id: userId })

    if (postExists && userExists) {
      const convertedUserId = convertToObjectId(body.userId)

      // Add userId to likesByUsers array
      if (action === 'add') {
        await Post.findOneAndUpdate(
          { _id: postId },
          { $push: { likesByUsers: convertedUserId } }
        )
      }

      if (action === 'remove') {
        await Post.findOneAndUpdate(
          { _id: postId },
          {
            $pull: { likesByUsers: convertedUserId },
          }
        )
      }
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
