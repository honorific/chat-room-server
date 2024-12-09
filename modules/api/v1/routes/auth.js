import express from 'express'
import {leave, register} from '../controller/auth/index.js'

const router = express.Router()

router.post('/register', register)
router.delete('/leave', leave)

export default router
