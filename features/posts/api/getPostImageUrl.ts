const fetchPostImageUrl = async (imageName: string) => {
  try {
    const response = await fetch(`/api/posts/post/imageUrl/${imageName}`)
    const data = await response.json()
    return data.imageUrl
  } catch (err) {
    console.log(err)
  }
}

export default fetchPostImageUrl
