import db from '../database/db.js'

export const getQuestionSelections = async(req, res) => {
  const result = await db.query.questionSelections.findMany().execute()
  res.status(200).json(result)
}

export default {
  getQuestionSelections
}