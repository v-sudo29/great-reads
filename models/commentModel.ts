import { Model, models, model } from 'mongoose'
import { Document, Schema } from 'mongoose'

interface CommentDocument extends Document {
  _id?: string
  postId: string
  userId: string
  userComment: string
  firstName: string
  lastName: string
  imageName?: string
  timestamp: number
}

const commentSchema = new Schema<CommentDocument, {}>(
  {
    postId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    userComment: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    imageName: {
      type: String,
      required: false,
    },
    timestamp: {
      type: Number,
      required: true,
    },
  },
  { minimize: false, strict: false }
)

const Comment = models.Comment || model('Comment', commentSchema)

export default Comment as Model<CommentDocument, {}>
