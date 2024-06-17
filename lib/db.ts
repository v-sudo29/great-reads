import mongoose from 'mongoose'

const url = process.env.DATABASE_URL ?? ''
let connection: typeof mongoose

const startDb = async () => {
  if (!connection) {
    try {
      connection = await mongoose.connect(url)
      console.log('MongoDB connected')
    } catch (error) {
      console.error(error)
      console.log('MongoDB not connected')
    }
  }
  return connection
}

export default startDb
