import { Router } from 'express'

import userQuestionAnswersController from '../controllers/user-question-answers.js'

const router = Router()

router.get('/user_question_answers', userQuestionAnswersController.getAllUserQuestionAnswers)
router.post('/user_question_answers', userQuestionAnswersController.createUserQuestionAnswer)
router.get('/user_question_answers/:userQuestionAnswerId', userQuestionAnswersController.getUserQuestionAnswer)
router.patch('/user_question_answers/:userQuestionAnswerId', userQuestionAnswersController.updateUserQuestionAnswer)

export default router