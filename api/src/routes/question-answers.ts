import { Router } from 'express'

import questionAnswersController from '../controllers/question-answers'

const router = Router()

router.get('/question_answers', questionAnswersController.getQuestionAnswers)

export default router