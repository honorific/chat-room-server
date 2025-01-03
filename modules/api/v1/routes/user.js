import express from 'express'
import {exist} from '../controller/user/index.js'

const router = express.Router()

router.get('/exist', exist)

export default router
