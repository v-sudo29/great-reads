import { Model, models, model, SchemaDefinitionProperty } from 'mongoose'
import { Document, Schema } from 'mongoose'

interface PostDocument extends Document {
  _id?: string
  userId: Schema.Types.ObjectId
  caption: string
  timestamp: number
  imageName: string | null
  likes: number
  comments: string[]
}

const postSchema = new Schema<PostDocument, {}>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    caption: {
      type: String,
    },
    timestamp: {
      type: Number,
    },
    imageName: {
      type: Schema.Types.Mixed,
      default: null,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Schema.Types.Mixed,
      default: [],
    },
  },
  { minimize: false, strict: false }
)

const Post = models.Post || model('Post', postSchema)

export default Post as Model<PostDocument, {}>
