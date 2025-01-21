import express from 'express'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import chatRouter from './routes/chat.js'
import tokenRouter from './routes/token.js'

const router = express.Router()

router.use('/api/v1/auth', authRouter)
router.use('/api/v1/user', userRouter)
router.use('/api/v1/chat', chatRouter)
router.use('/api/v1/token', tokenRouter)

export default router
