import { Router } from 'express'
import * as Posts from '../posts'

const router = Router()

router.use('/posts', Posts.router)

export default router
