import { Model, models, model } from 'mongoose'
import { Document, Schema } from 'mongoose'

interface GoogleUserDocument extends Document {
  email: string
  name: string
  lists: Record<string, string[]> | {}
}

interface Methods {
  comparePassword(password: string): Promise<boolean>
}

const googleUserSchema = new Schema<GoogleUserDocument, {}, Methods>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  lists: {
    type: Schema.Types.Mixed,
    default: {},
    required: true
  }
}, { minimize: false })

const GoogleUser = models.GoogleUser || model('GoogleUser', googleUserSchema)

export default GoogleUser as Model<GoogleUserDocument, {}, Methods>