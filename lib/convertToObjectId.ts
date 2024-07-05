import { Types } from 'mongoose'

const convertToObjectId = (id: string) => {
  return new Types.ObjectId(id)
}

export default convertToObjectId
