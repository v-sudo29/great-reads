import { Model, models, model, SchemaDefinitionProperty } from 'mongoose'
import { Document, Schema } from 'mongoose'
import { IBook } from '@customTypes/bookType'
import bcrypt from 'bcrypt'

interface UserDocument extends Document {
  id?: string
  _id?: string
  email: string
  name: string
  password: string
  lists: Record<string, IBook[]> | {}
  friends: SchemaDefinitionProperty[] | []
  imageName: string | null
  error?: string
}

interface Methods {
  comparePassword(password: string): Promise<boolean>
}

const userSchema = new Schema<UserDocument, {}, Methods>({
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
  password: {
    type: String,
    required: true
  },
  lists: {
    type: Schema.Types.Mixed,
    default: {
      ['Read']: [Schema.Types.Mixed],
      ['Currently Reading']: [Schema.Types.Mixed],
      ['Want to Read']: [Schema.Types.Mixed]
    },
    required: true
  },
  friends: {
    type: [Schema.ObjectId],
    required: true
  },
  imageName: {
    type: Schema.Types.Mixed,
    default: null
  }
}, { minimize: false })

// Hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  if (!this.password) return next()
  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    throw error
  }
})

// Compare password method
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (error) {
    throw error
  }
}

const User = models.User || model('User', userSchema)

export default User as Model<UserDocument, {}, Methods>