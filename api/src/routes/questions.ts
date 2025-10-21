import { Router } from 'express'

import questionsController from '../controllers/questions.js'

const router = Router()

// Define specific routes
// In here, I am only defining getQuestions as that's what's needed only for the questions, If I had more, I would've included
// much more, like creating new questions, getting certain questions
router.get('/questions', questionsController.getQuestions)

export default router