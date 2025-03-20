import express from 'express'
import {createRoom} from '../controller/room/index.js'
import { verifyAccessToken } from '../middlewares/auth/index.js'

const router = express.Router()

router.post('/create', verifyAccessToken, createRoom)

export default router
