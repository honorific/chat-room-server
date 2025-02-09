import express from 'express'
import {sendMessage} from '../controller/chat/index.js'
import { verifyAccessToken } from '../middlewares/auth/index.js'

const router = express.Router()

router.post('/send', verifyAccessToken, sendMessage)

export default router
