const CreatePost = () => {
  return (
    <div className="border">
      {/* Caption */}
      <label htmlFor="postCaption">Post Caption</label>
      <input type="text" name="postCaption" />

      {/* Image (optional) */}
      <input type="text" />
    </div>
  )
}

export default CreatePost
