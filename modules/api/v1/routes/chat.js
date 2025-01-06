import express from 'express'
import {sendMessage} from '../controller/chat/index.js'

const router = express.Router()

router.post('/send', sendMessage)

export default router
