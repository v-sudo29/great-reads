import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const bucketName = process.env.BUCKET_NAME ?? ''
const bucketRegion = process.env.BUCKET_REGION ?? ''
const accessKey = process.env.ACCESS_KEY ?? ''
const secretAccessKey = process.env.SECRET_ACCESS_KEY ?? ''

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion
})

export const uploadFile = async (fileBuffer: Buffer, fileName: string, fileType: string) => {
  const uploadParams = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileBuffer,
    ContentType: fileType    
  }
  return await s3.send(new PutObjectCommand(uploadParams))
}

export const getObjectSignedUrl = async (key: string) => {
  const getObjectParams = {
    Bucket: bucketName,
    Key: key
  }
  const command = new GetObjectCommand(getObjectParams)
  const seconds = 21600 // 6 hours in seconds
  const url = await getSignedUrl(s3, command, { expiresIn: seconds })
  return url
}