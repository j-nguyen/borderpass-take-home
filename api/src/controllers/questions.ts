import { eq } from 'drizzle-orm/pg-core/expressions'
import db from '../database/db.js'
import { questions as questionsTable } from '../database/schema.js'

export const getQuestions = async(req, res) => { 
  const result = await db.query.questions.findMany({ with: { question_selections: true } })
  res.status(200).json(result)
}

export const createQuestion = async(req, res) => {
  await db.insert(questionsTable).values()
}

export const deleteQuestion = async(req, res) => {
  try {
    await db.delete(questionsTable).where(eq(questionsTable.id, req.questionId))
    res.status(204)
  } catch(e) {
    console.error(e)
    res.status(404).json({ message: e.message })    
  }
}

export default {
  getQuestions,
  createQuestion,
  deleteQuestion,
}