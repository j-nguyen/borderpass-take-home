import db from '../database/db'
import { questions as questionsTable } from '../database/schema'

export const getQuestions = async(req, res) => { 
  const result = await db.select().from(questionsTable).execute()
  res.status(200).json(result)
}

export default {
  getQuestions
}