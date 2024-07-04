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
    if (e.target) {
      const buttonElement = e.target as HTMLButtonElement
      const timestamp = buttonElement.getAttribute('data-timestamp')
      const postId = buttonElement.getAttribute('data-post-id')

      try {
        const oldPostsCopy = session?.user.posts
        const updatedPosts = oldPostsCopy?.filter(
          (post) => post.timestamp.toString() !== timestamp
        )
        // Update session
        update({ posts: updatedPosts })

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

  if (session?.user && allPosts) {
    userPosts = allPosts.map((post: any, i: number) => {
      const formattedTime = formatTime(Number(post.timestamp))

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
