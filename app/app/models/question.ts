import type { QuestionSelection } from "./question-selection"

export interface Question {
  id: number
  title: string
  question_type: string
  required?: boolean
  question_selections?: QuestionSelection[]
  created_at: Date
  updated_at: Date
}