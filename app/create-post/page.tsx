'use client'
import { Button } from '@components/common/Button'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { formatTime } from '@utils/formatTime'

const CreatePost = () => {
  const [caption, setCaption] = useState('')
  const { data: session, update } = useSession()
  let userPosts: JSX.Element[] | null = null

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target && e.target.value !== '') setCaption(e.target.value)
  }

  const handleCreatePost = async () => {
    if (caption === '' || !session || !session.user.id) return
    try {
      const currentTimestamp = new Date().getTime()

      const requestObject = {
        caption: caption,
        timestamp: currentTimestamp,
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

      try {
        const oldPostsCopy = session?.user.posts
        const updatedPosts = oldPostsCopy?.filter(
          (post) => post.timestamp.toString() !== timestamp
        )
        update({ posts: updatedPosts })
      } catch (err) {
        console.log(err)
      }
    }
  }

  if (session?.user) {
    userPosts = session.user.posts.map((post, i) => {
      const formattedTime = formatTime(Number(post.timestamp))

      return (
        <div
          key={`${session.user.id}-post-${i}`}
          className="border border-black p-4 rounded-md"
          data-timestamp={post.timestamp}
          data-caption={post.caption}
        >
          <div>
            <p>{post.caption}</p>
            <p>{formattedTime}</p>
          </div>
          <div className="mt-4">
            <button
              className="bg-red-400 text-white font-montserrat font-semibold rounded-[4px] px-5 py-1"
              onClick={(e) => handleDeletePost(e)}
              data-timestamp={post.timestamp}
              data-caption={post.caption}
            >
              Delete
            </button>
          </div>
        </div>
      )
    })
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
      <input type="text" />

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
