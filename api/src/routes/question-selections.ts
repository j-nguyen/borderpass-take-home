import { Router } from 'express'

import questionSelectionsController from '../controllers/question-selections.js'

const router = Router()

router.get('/question_selections', questionSelectionsController.getQuestionSelections)

export default router