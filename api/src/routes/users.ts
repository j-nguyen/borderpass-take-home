import { Router } from 'express'
import usersController from '../controllers/users.js'
import validate from '../lib/validate.js'
import { body, query } from 'express-validator'

const router = Router()

// Here, we confirm to make sure the query email cant be empty
router.get('/users', validate([
  query('email').notEmpty()
]), usersController.getUserByEmail)

router.post('/users', validate([
  body('email').isEmail()
]), usersController.createUser)

export default router