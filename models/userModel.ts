import { Model, models, model, SchemaDefinitionProperty } from 'mongoose'
import { Document, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

interface UserDocument extends Document {
  id?: string
  _id?: string
  email: string
  name: string
  password: string
  lists: Record<string, Record<string, Record<string, string>>[]> | {}
  friends: SchemaDefinitionProperty[] | []
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
    default: {},
    required: true
  },
  friends: {
    type: [Schema.ObjectId],
    ref: 'User',
    required: true
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