export const addUserToLikesByUsersField = async (
  postId: string | null,
  userId: string
) => {
  try {
    const response = await fetch(`/api/posts/post/likesByUsers/${postId}`, {
      method: 'POST',
      body: JSON.stringify({
        userId: userId,
        action: 'add',
      }),
    })
    const data = await response.json()
    console.log(data)
  } catch (err) {
    console.log(err)
  }
}

export const removeUserFromLikesByUsersField = async (
  postId: string | null,
  userId: string
) => {
  try {
    const response = await fetch(`/api/posts/post/likesByUsers/${postId}`, {
      method: 'POST',
      body: JSON.stringify({
        userId: userId,
        action: 'remove',
      }),
    })
    const data = await response.json()
    console.log(data)
  } catch (err) {
    console.log(err)
  }
}
