import express from 'express'
import dotenv from 'dotenv'
import modules from './modules/index.js'

dotenv.config()
const port = process.env.BEPORT

const app = express()

app.use(modules)

app.listen(port, () => {
  console.log(`Backend running in port ${port}`)
})
