import express from 'express'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'

const router = express.Router()

router.use('/api/v1/auth', authRouter)
router.use('/api/v1/user', userRouter)

export default router
