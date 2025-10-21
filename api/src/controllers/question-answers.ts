import db from '../database/db'
import { questionAnswers as questionAnswersTable } from '../database/schema'

export const getQuestionAnswers = async(req, res) => {
  const result = await db.select().from(questionAnswersTable).execute()
  res.status(200).json(result)
}

export default {
  getQuestionAnswers
}