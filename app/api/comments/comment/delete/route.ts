import Comment from '@models/commentModel'
import Post from '@models/postModel'
import { NextResponse } from 'next/server'

type NewResponse = NextResponse<{
  success?: boolean
  error?: string
}>

// DELETE request to delete all post instances from database
export const DELETE = async (req: Request): Promise<NewResponse> => {
  try {
    const body = await req.json()

    // Find Comment in "comments" collection and delete
    const commentFound = await Comment.findOne({ _id: body.commentId })

    // CHECKING
    console.log(commentFound)

    // await Comment.findOneAndDelete({ _id: body.commentId })

    // Find comment in Post and delete -- need postId
    // await Post.findOneAndUpdate({})

    // Find comment in post in User -- need userId

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    return NextResponse.json({ error: `${error}` })
  }
}
