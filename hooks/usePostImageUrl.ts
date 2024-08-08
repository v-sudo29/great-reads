import { useEffect, useState } from 'react'

const usePostImageUrl = (imageName: string | null) => {
  const [postImageUrl, setPostImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | unknown>(null)

  useEffect(() => {
    if (imageName) {
      const fetchPostImageUrl = async (imageName: string) => {
        const response = await fetch(`/api/posts/post/imageUrl/${imageName}`)
        const data = await response.json()
        setPostImageUrl(data.imageUrl)
      }
      fetchPostImageUrl(imageName)
    }
  }, [imageName])

  return {
    postImageUrl,
    loading,
    error,
  }
}

export default usePostImageUrl
