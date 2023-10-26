import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import path from 'path'
import connectDB from './db/connect'
import { router } from './routes/tasks.route'

const app = express()

// middleware
const publicDirectoryPath = path.join(__dirname, './public')
app.use(express.static(publicDirectoryPath))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())
app.use(cors())

// routes
app.use('/api/v1/tasks', router)

const PORT = process.env.PORT || 3000

// connect to db
const start = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}
start()
