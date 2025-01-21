import express from 'express'
import {getNewAccessToken} from '../controller/token/index.js'

const router = express.Router()

router.get('/', getNewAccessToken)

export default router
