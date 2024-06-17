import { Model, models, model, SchemaDefinitionProperty } from 'mongoose'
import { Document, Schema } from 'mongoose'
import { IBook } from '@customTypes/bookType'

interface GoogleUserDocument extends Document {
  id?: string
  _id?: string
  email: string
  name: string
  lists: Record<string, IBook[]> | {}
  friends: SchemaDefinitionProperty[] | []
  imageName: string | null
  defaultImage?: string
}

interface Methods {
  comparePassword(password: string): Promise<boolean>
}

const googleUserSchema = new Schema<GoogleUserDocument, {}, Methods>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lists: {
      type: Schema.Types.Mixed,
      default: {
        ['Read']: [Schema.Types.Mixed],
        ['Currently Reading']: [Schema.Types.Mixed],
        ['Want to Read']: [Schema.Types.Mixed],
      },
      required: true,
    },
    friends: {
      type: [Schema.ObjectId],
      required: true,
    },
    imageName: {
      type: Schema.Types.Mixed,
      default: null,
    },
    defaultImage: {
      type: String,
      required: true,
    },
  },
  { minimize: false }
)

const GoogleUser = models.GoogleUser || model('GoogleUser', googleUserSchema)

export default GoogleUser as Model<GoogleUserDocument, {}, Methods>
