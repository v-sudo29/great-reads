import Comment from '@models/commentModel'
import Post from '@models/postModel'
import User from '@models/userModel'
import { NextResponse } from 'next/server'

interface NewRequest extends Request {
  newComment: {
    _id?: string
    postId: string
    userId: string
    userComment: string
    firstName: string
    lastName: string
    imageName?: string
    timestamp: number
  }
}

type NewResponse = NextResponse<{
  success?: boolean
  error?: string
}>

// POST request to update likesCount of a post
export const POST = async (req: NewRequest): Promise<NewResponse> => {
  try {
    const body = await req.json()

    if (body.newComment) {
      const comment = body.newComment

      // Create new Comment in "comments" collection
      // const commentedCreated = await Comment.create(comment)

      // Add comment to correct Post in Post collection
      const postAppended = await Post.findOneAndUpdate(
        { _id: comment.postId },
        { $push: { comments: comment } }
      )

      // Add comment to correct post in Users in Users collection
      const updatedUser = await User.findOneAndUpdate(
        {
          _id: comment.userId,
          'posts._id': comment.postId,
        },
        {
          $push: {
            'posts.$.comments': comment,
          },
        }
      )
      if (updatedUser) console.log(updatedUser)
    }

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    return NextResponse.json({ error: `${error}` })
  }
}
