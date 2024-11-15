import express from 'express'
import dotenv from 'dotenv'
import modules from './modules/api/v1/index.js'
import mongoose from 'mongoose'

dotenv.config()
const port = process.env.BEPORT

const app = express()
app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-Type, Authorization',
  )
  next()
})


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(() => console.log("Couldn't connect to MongoDB"))

app.use(modules)

app.listen(port, () => {
  console.log(`Backend running in port ${port}`)
})
