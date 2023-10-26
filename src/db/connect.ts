import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

export default async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connection to MongoDB successful')
  } catch (e) {
    console.log('Connection failed to MongoDB', e)
  }
}
