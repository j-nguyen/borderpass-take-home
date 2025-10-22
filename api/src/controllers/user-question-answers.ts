import { eq } from 'drizzle-orm'
import db from '../database/db.js'
import { userQuestionAnswers as userQuestionAnswersTable } from '../database/schema.js'

export const getAllUserQuestionAnswers = async(req, res) => {
  const result = await db.query.userQuestionAnswers.findMany()

  res.status(200).json(result)
}

export const getUserQuestionAnswer = async(req, res) => {
  const result = await db.query.userQuestionAnswers.findFirst({
    where: eq(userQuestionAnswersTable.id, req.params.userQuestionAnswerId)
  })

  if (!result) {
    return res.status(404).json({ message: 'User Question Answer Not Found' })
  }

  return res.status(200).json(result)
}

export const createUserQuestionAnswer = async(req, res) => {
  const data = {
    // TODO: If more time, we only allow one or the other
    question_id: req.body.question_id,
    user_id: req.body.user_id,
    question_selection_id: req.body?.question_selection_id,
    answer: req.body?.answer
  }

  try {
    const newUserQuestionAnswer = await db.insert(userQuestionAnswersTable).values(data).returning()
    res.status(201).json(newUserQuestionAnswer)
  } catch(e) {
    console.error(e)
    res.status(422).json({ message: e.message })
  }
}

export const updateUserQuestionAnswer = async(req, res) => {
  const data = {
    // TODO: If more time, we only allow one or the other
    question_id: req.body.question_id,
    user_id: req.body.user_id,
    question_selection_id: req.body.question_selection_id,
    answer: req.body.answer
  }

  try {
    const result = await db.update(userQuestionAnswersTable).set(data).where(eq(userQuestionAnswersTable.id, req.params.userQuestionAnswerId)).returning()
    res.status(200).json(result)
  } catch(e) {
    console.error(e)
    res.status(400).json({ message: e.message })
  }
}

export default {
  getAllUserQuestionAnswers,
  getUserQuestionAnswer,
  createUserQuestionAnswer,
  updateUserQuestionAnswer,
}