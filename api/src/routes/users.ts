import { Router } from 'express'

import usersController from '../controllers/users.js'

const router = Router()

router.get('/users', usersController.getUserByEmail)
router.post('/users', usersController.createUser)

export default router