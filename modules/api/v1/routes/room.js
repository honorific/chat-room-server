import express from 'express'
import {createRoom} from '../controller/room/index.js'

const router = express.Router()

router.post('/room', createRoom)

export default router
