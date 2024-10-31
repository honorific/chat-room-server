import express from 'express'
import dotenv from 'dotenv'

dotenv.config()
const port = process.env.BEPORT

const app = express()

app.listen(port, () => {
  console.log(`Backend running in port ${port}`)
})
