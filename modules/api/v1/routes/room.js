import express from 'express'
import {createRoom, deleteRoom} from '../controller/room/index.js'
import {verifyAccessToken} from '../middlewares/auth/index.js'

const router = express.Router()

router.post('/create', verifyAccessToken, createRoom)
router.delete('/delete', verifyAccessToken, deleteRoom)

export default router
