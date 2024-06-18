import { NextRequest, NextResponse } from 'next/server'
import { getObjectSignedUrl } from '@lib/s3'
import User from '@models/userModel'
import startDb from '@lib/db'

interface NewRequest {
  id: string
}

type NewResponse = NextResponse<{
  posts?: any
  success?: boolean
  error?: string
}>

// POST request to get temporary signed url from s3
export const GET = async (req: NextRequest): Promise<NewResponse> => {
  try {
    const pathNameSplit = new URL(req.url ?? '').pathname.split('/')
    const userId = pathNameSplit[pathNameSplit.length - 1]

    // Find user in database
    await startDb()
    const credentialsUser = await User.findOne({ _id: userId })

    if (credentialsUser) {
      // Retrieve all imageUrls from s3 then append to posts
      const updatedPosts = await Promise.all([
        ...credentialsUser.posts.map(async (post) => {
          if (post.imageName) {
            const url = await getObjectSignedUrl(post.imageName)
            return {
              ...post,
              imageUrl: url,
            }
          } else return post
        }),
      ])

      return NextResponse.json({
        posts: updatedPosts,
        success: true,
      })
    } else {
      return NextResponse.json({
        success: false,
      })
    }
  } catch (error) {
    return NextResponse.json({ error: `${error}` })
  }
}
