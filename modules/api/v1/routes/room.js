import express from 'express'
import {createRoom, deleteRoom} from '../controller/room/index.js'
import {verifyAccessToken} from '../middlewares/auth/index.js'

const router = express.Router()

router.post('/create', verifyAccessToken(false), createRoom)
router.delete('/delete', verifyAccessToken(false), deleteRoom)

export default router
