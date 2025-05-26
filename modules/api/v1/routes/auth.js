import express from 'express'
import {leave, register} from '../controller/auth/index.js'
import {verifyAccessToken} from '../middlewares/auth/index.js'

const router = express.Router()

router.post('/register', register)
router.delete('/leave', verifyAccessToken, leave)

export default router
