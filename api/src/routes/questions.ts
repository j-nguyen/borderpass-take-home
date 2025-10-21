import { Router } from 'express'

import questionsController from '../controllers/questions.js'

const router = Router()

// Define specific routes

router.get('/questions', questionsController.getQuestions)
router.post('/questions', questionsController.createQuestion)
router.delete('/questions/:questionId', questionsController.deleteQuestion)

export default router