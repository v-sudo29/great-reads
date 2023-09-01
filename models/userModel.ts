import { Model, models, model } from 'mongoose'
import { Document, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

interface UserDocument extends Document {
  id: string
  _id: string
  email: string
  name: string
  password: string
  lists: Array<string[]> | []
}

interface Methods {
  comparePassword(password: string): Promise<boolean>
}

const userSchema = new Schema<UserDocument, {}, Methods>({
  id: {
    type: String,
    required: false
  },
  _id: {
    type: String,
    required: false
  },
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
    type: [String],
    default: [],
    required: true
  }
})

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