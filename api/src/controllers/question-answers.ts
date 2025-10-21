import db from '../database/db.js'
import { questionAnswers as questionAnswersTable } from '../database/schema.js'

export const getQuestionAnswers = async(req, res) => {
  const result = await db.select().from(questionAnswersTable).execute()
  res.status(200).json(result)
}

export default {
  getQuestionAnswers
}