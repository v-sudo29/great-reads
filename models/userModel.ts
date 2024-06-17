import { Model, models, model, SchemaDefinitionProperty } from 'mongoose'
import { Document, Schema } from 'mongoose'
import { IBook } from '@customTypes/bookType'
import bcrypt from 'bcrypt'

interface UserDocument extends Document {
  id?: string
  _id?: string
  email: string
  firstName: string
  lastName: string
  password: string
  lists:
    | Record<
        string,
        {
          color: string
          books: IBook[]
        }
      >
    | {}
  friends: SchemaDefinitionProperty[] | []
  imageName: string | null
  error?: string
}

interface Methods {
  comparePassword(password: string): Promise<boolean>
}

const userSchema = new Schema<UserDocument, {}, Methods>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    lists: {
      type: Schema.Types.Mixed,
      default: {
        ['Read']: {
          color: '59BC99',
          books: [Schema.Types.Mixed],
        },
        ['Currently Reading']: {
          color: '745DFF',
          books: [Schema.Types.Mixed],
        },
        ['Want to Read']: {
          color: 'FBB246',
          books: [Schema.Types.Mixed],
        },
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
  },
  { minimize: false }
)

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
