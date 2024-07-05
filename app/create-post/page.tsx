'use client'
import { Button } from '@components/common/Button'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { formatTime } from '@utils/formatTime'
import Image from 'next/image'

const CreatePost = () => {
  const [caption, setCaption] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false) // TODO: create loading UI
  const { data: session, update } = useSession()
  const [allPosts, setAllPosts] = useState<any>(null)
  let userPosts: JSX.Element[] | null = null

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target && e.target.value !== '') setCaption(e.target.value)
  }

  const handleCreatePost = async () => {
    if (caption === '' || !session || !session.user.id) return
    try {
      const currentTimestamp = new Date().getTime()
      const uploadResponse = await handleUpload()

      const requestObject = {
        caption: caption,
        timestamp: currentTimestamp,
        imageName: uploadResponse ? uploadResponse.imageName : null,
        likes: 0,
        comments: [],
        likesByUsers: [],
      }

      await update({
        posts: [...session.user.posts, requestObject],
      })
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeletePost = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (e.target && session && session.user.id) {
      const buttonElement = e.target as HTMLButtonElement
      const timestamp = buttonElement.getAttribute('data-timestamp')
      const postId = buttonElement.getAttribute('data-post-id')

      try {
        const oldPostsCopy = session?.user.posts
        const updatedPosts = oldPostsCopy?.filter(
          (post) => post.timestamp.toString() !== timestamp
        )
        const updatedLikedPosts = [
          ...session?.user.likedPosts.filter(
            (currentPostId) => currentPostId !== postId
          ),
        ]

        // Update session: posts and likedPosts
        await update({ posts: updatedPosts })
        await update({ likedPosts: updatedLikedPosts })

        // Delete all instances of post in database
        const response = await fetch(`/api/posts/post/delete/${postId}`, {
          method: 'DELETE',
        })
        const data = await response.json()
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
  }

  const handleUpdateLikes = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const likeButton = e.target as HTMLButtonElement
    const postId = likeButton.getAttribute('data-post-id')

    // Check if authenticated user has liked the post in likedPosts array
    if (session?.user.likedPosts.find((currentId) => currentId === postId)) {
      console.log('User has liked post before!')
      // UPDATE SESSION TOKEN - update API
      // 1. Decrement post's "likesCount" and remove userId from likesByUsers array in session token
      // 2. Remove postId from "likedPosts" array of User

      // UPDATE POST IN DATABASE - fetch API
      // 1. Update likesCount in Post - decrement likesCount in Post
      // 2. Remove userId from Post likesByUsers array
      const updatedPosts = session.user.posts.map((post) => {
        if (post._id === postId) {
          const updatedPost = {
            ...post,
          }
          updatedPost.likesCount = post.likesCount -= 1
          updatedPost.likesByUsers = updatedPost.likesByUsers.filter(
            (userId) => userId !== session.user.id
          )
          return updatedPost
        } else return post
      })

      const updatedLikedPosts = [
        ...session.user.likedPosts.filter(
          (likedPostId) => likedPostId !== postId
        ),
      ]

      // Update session token
      await update({ posts: updatedPosts })
      await update({ likedPosts: updatedLikedPosts })

      // Update Post in database
      const response = await fetch(`/api/posts/post/likesCount/${postId}`, {
        method: 'POST',
        body: JSON.stringify({
          action: 'decrement',
        }),
      })
      const data = await response.json()

      if (data) {
        const response = await fetch(`/api/posts/post/likesByUsers/${postId}`, {
          method: 'POST',
          body: JSON.stringify({
            userId: session.user.id,
            action: 'remove',
          }),
        })
        const data = await response.json()
        console.log(data)
      }
    } else {
      console.log('user has not liked post before!')

      if (session && session.user) {
        const postMatch = session.user.posts.find((post) => post._id === postId)
        // UPDATE SESSION TOKEN - update API
        // 1. Increment post's "likesCount" and add userId to likesByUsers array in session token
        // 2. Add postId to "likedPosts" array of User

        // UPDATE POST IN DATABASE - fetch API
        // 1. Update likesCount in Post
        // 2. Update userId of Post likesByUsers

        if (postMatch) {
          const updatedPosts = session.user.posts.map((post) => {
            if (post._id === postId) {
              const newPost = {
                ...post,
              }
              newPost.likesCount = post.likesCount += 1
              newPost.likesByUsers = [...post.likesByUsers, session.user.id]
              return newPost
            } else return post
          })
          // Update session token
          await update({ posts: updatedPosts })
          await update({ likedPosts: [...session.user.likedPosts, postId] })

          // Update post in database
          const response = await fetch(`/api/posts/post/likesCount/${postId}`, {
            method: 'POST',
            body: JSON.stringify({
              action: 'increment',
            }),
          })
          const data = await response.json()

          if (data) {
            const response = await fetch(
              `/api/posts/post/likesByUsers/${postId}`,
              {
                method: 'POST',
                body: JSON.stringify({
                  userId: session.user.id,
                  action: 'add',
                }),
              }
            )
            const data = await response.json()
            console.log(data)
          }
        }
      }
    }
  }

  if (session?.user && allPosts) {
    userPosts = allPosts.map((post: any, i: number) => {
      const formattedTime = formatTime(Number(post.timestamp))
      const isLikedByUser = session?.user.likedPosts.find(
        (currentId) => currentId === post._id
      )

      return (
        <div
          key={`${session.user.id}-post-${i}`}
          className="border border-black p-4 rounded-md"
          data-timestamp={post.timestamp}
          data-caption={post.caption}
          data-post-id={post._id}
        >
          <div>
            <p>{post.caption}</p>
            <p>{formattedTime}</p>
          </div>
          {post.imageUrl && (
            <div>
              <Image src={post.imageUrl} alt="" width="400" height="100" />
            </div>
          )}
          <div className="mt-4">
            <button
              className="bg-red-400 text-white font-montserrat font-semibold rounded-[4px] px-5 py-1"
              onClick={(e) => handleDeletePost(e)}
              data-timestamp={post.timestamp}
              data-caption={post.caption}
              data-post-id={post._id}
            >
              Delete
            </button>
          </div>
          <div className=" mt-4">
            <button
              className={
                isLikedByUser
                  ? 'bg-primary text-white font-montserrat font-semibold rounded-[4px] px-5 py-1'
                  : 'bg-gray-400 text-white font-montserrat font-semibold rounded-[4px] px-5 py-1'
              }
              onClick={(e) => handleUpdateLikes(e)}
              data-post-id={post._id}
            >
              {post.likesCount} Likes
            </button>
          </div>
        </div>
      )
    })
  }

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (session && session.user.id) {
        console.log(session.user)
        try {
          const res = await fetch(`/api/posts/userPosts/${session.user.id}`)
          const data = await res.json()
          if (data.success) setAllPosts(data.posts)
        } catch (err) {
          console.log(err)
        }
      }
    }
    if (session && session.user.id) fetchUserPosts()
  }, [session])

  const handleUpload = async () => {
    if (file && session && session.user && session.user.email) {
      const formData = new FormData()

      formData.append('file', file)
      formData.append('id', session.user.id)

      // Send form data
      // 1. Uploads file to s3
      // 2. Gets returned db imageName and s3 signed imageUrl
      // 3. Update imageName in db, sets imageUrl on client
      try {
        const res = await fetch('/api/posts/post/upload', {
          method: 'POST',
          body: formData,
        })
        const data = await res.json()
        if (data.success && data.imageName) return data
        else return null
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="border p-10">
      {/* Caption */}
      <div className="flex flex-col gap-2">
        <label htmlFor="postCaption">Post Caption</label>
        <textarea
          className="resize p-3 border border-black"
          name="postCaption"
          placeholder="Enter post caption here"
          rows={4}
          cols={40}
          onChange={(e) => handleOnChange(e)}
        ></textarea>
      </div>

      {/* Image (optional) */}
      <div className="flex flex-col gap-2 my-4">
        <label htmlFor="postImage">Image (Optional)</label>
        <input
          type="file"
          name="postImage"
          onChange={(e) => setFile(e.target.files && e.target.files[0])}
        />
      </div>

      {/* Create post */}
      <Button
        type="primary"
        bordersRounded={false}
        clickHandler={handleCreatePost}
      >
        Create Post
      </Button>

      {/* Posts In Order */}
      <p className="mt-10">User Posts</p>
      <div className="flex flex-col gap-5 mt-5">{userPosts?.reverse()}</div>
    </div>
  )
}

export default CreatePost
