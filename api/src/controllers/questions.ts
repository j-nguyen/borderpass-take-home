import { eq } from 'drizzle-orm/pg-core/expressions'
import db from '../database/db.js'
import { questions as questionsTable, questionSelections as questionSelectionsTable } from '../database/schema.js'

export const getQuestions = async(req, res) => { 
  const result = await db.query.questions.findMany({ with: { question_selections: true } })
  res.status(200).json(result)
}

export const createQuestion = async(req, res) => {
  const body = {
    title: req.body.title,
    question_type: req.body.question_type,
    required: req.body?.required ?? false,
  }

  const newQuestion = await db.insert(questionsTable).values(body).returning()

  if (req.body.question_selections) {
    const updatedSelections = req.body.question_selections.map(q => ({ ...q, question_id: newQuestion[0].id }))
    console.log(updatedSelections)
    await db.insert(questionSelectionsTable).values(updatedSelections)
  }

  res.status(201).json(newQuestion)
}

export const deleteQuestion = async(req, res) => {
  try {
    await db.delete(questionsTable).where(eq(questionsTable.id, req.params.questionId))
    return res.status(204).json(null)
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