export const incrementLikesCount = async (postId: string | null) => {
  try {
    const response = await fetch(`/api/posts/post/likesCount/${postId}`, {
      method: 'POST',
      body: JSON.stringify({
        action: 'increment',
      }),
    })
    const data = await response.json()
    console.log(data)
  } catch (err) {
    console.log(err)
  }
}

export const decrementLikesCount = async (postId: string | null) => {
  try {
    const response = await fetch(`/api/posts/post/likesCount/${postId}`, {
      method: 'POST',
      body: JSON.stringify({
        action: 'decrement',
      }),
    })
    const data = await response.json()
    console.log(data)
  } catch (err) {
    console.log(err)
  }
}
