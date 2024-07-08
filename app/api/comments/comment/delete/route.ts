import Comment from '@models/commentModel'
import Post from '@models/postModel'
import User from '@models/userModel'
import { NextResponse } from 'next/server'
import mongoose from 'mongoose'

type NewResponse = NextResponse<{
  success?: boolean
  error?: string
}>

// DELETE request to delete all post instances from database
export const DELETE = async (req: Request): Promise<NewResponse> => {
  try {
    const body = await req.json()

    // 1. Find and delete comment from Comments collection -- need commentId -- CHECK
    await Comment.findOneAndDelete({ _id: body.commentId })

    // 2. Find comment in Post collection and delete -- need postId and commentId -- CHECK
    const result = await Post.findOneAndUpdate(
      { _id: body.postId },
      {
        $pull: {
          comments: { _id: new mongoose.Types.ObjectId(body.commentId) },
        },
      }
    )

    // 3. Find and remove comment in post in User -- need userId
    const user = await User.findOneAndUpdate(
      {
        _id: body.userId,
        'posts._id': body.postId,
      },
      {
        $pull: {
          'posts.$.comments': {
            _id: new mongoose.Types.ObjectId(body.commentId),
          },
        },
      }
    )

    console.log(user)

    return NextResponse.json({
      success: true,
      data: user,
    })
  } catch (error) {
    return NextResponse.json({ error: `${error}` })
  }
}
