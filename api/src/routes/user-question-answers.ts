import { Router } from 'express'
import validate from '../lib/validate.js'
import userQuestionAnswersController from '../controllers/user-question-answers.js'
import { body } from 'express-validator'

const router = Router()

router.get('/user_question_answers', userQuestionAnswersController.getAllUserQuestionAnswers)

router.post(
  '/user_question_answers',
  validate([
    body('question_id').notEmpty(),
    body('user_id').notEmpty(),
    body('question_selection_id').optional(),
    body('answer').optional(),
  ]),
  userQuestionAnswersController.createUserQuestionAnswer
)

router.get('/user_question_answers/:userQuestionAnswerId', userQuestionAnswersController.getUserQuestionAnswer)

router.patch(
  '/user_question_answers/:userQuestionAnswerId',
  validate([
    body('question_id').notEmpty(),
    body('user_id').notEmpty(),
    body('question_selection_id').optional(),
    body('answer').optional(),
  ]),
  userQuestionAnswersController.updateUserQuestionAnswer
)

export default router