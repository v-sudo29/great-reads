'use client'
import { Button } from '@components/common/Button'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

const CreatePost = () => {
  const [caption, setCaption] = useState('')
  const { data: session, update } = useSession()

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target && e.target.value !== '') {
      setCaption(e.target.value)
    }
  }

  const handleCreatePost = async () => {
    if (caption === '' || !session || !session.user.id) return
    try {
      const currentTimestamp = new Date().getTime()

      const requestObject = {
        caption: caption,
        timestamp: currentTimestamp,
      }

      await update({ posts: [...session.user.posts, requestObject] })
    } catch (err) {
      console.error(err)
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
      <input type="text" />

      {/* Create post */}
      <Button
        type="primary"
        bordersRounded={false}
        clickHandler={handleCreatePost}
      >
        Create Post
      </Button>
    </div>
  )
}

export default CreatePost
