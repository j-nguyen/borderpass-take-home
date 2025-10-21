import { relations } from 'drizzle-orm';
import { integer, boolean, pgEnum, pgTable, text, timestamp, varchar, uniqueIndex } from 'drizzle-orm/pg-core';

// To make it easier, we will instantiate the schema tables through here

export const questionTypes = pgEnum('question_types', ['dropdown', 'multiple_choice', 'short_answer', 'long_answer', 'checkbox'])

/**
 * ERD Layout:
 * 
 * Questions Table
 * ID, title, question_type, required, created_at, updated_at
 * 
 * Question_Selections Table
 * ID, question_id, answer, created_at, updated_at
 * 
 * Users Table
 * ID, email, created_at, updated_at
 * 
 * User Question_Answers Table
 * ID, user_id, question_selection_id, answer (for short/long text) created_at, updated_at
 */


// Timestamps to setup
const timestamps = {
  updated_at: timestamp().defaultNow().notNull(),
  created_at: timestamp().defaultNow().notNull(),
}

export const questions = pgTable(
  'questions',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar('title').notNull(),
    question_type: questionTypes().default('short_answer').notNull(),
    required: boolean().default(true).notNull(),
    ...timestamps
  }
)

// For multiple choice and text answers, we can revert to this
export const questionSelections = pgTable(
  'question_selections',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    question_id: integer().references(() => questions.id, { onDelete: 'cascade' }).notNull(),
    question_text: text().notNull(),
    ...timestamps,
  }
)

export const users = pgTable(
  'users',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    email: varchar().notNull().unique(),
    ...timestamps,
  }
)

export const userQuestionAnswers = pgTable(
  'user_question_answers',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    user_id: integer().references(() => users.id, { onDelete: 'cascade' }).notNull(),
    question_selection_id: integer().references(() => questionSelections.id, { onDelete: 'cascade' }),
    answer: text(), // for long/short answers
    ...timestamps,
  },
  (t) => [
    uniqueIndex('user_id_question_selection_id').on(t.user_id, t.question_selection_id)
  ]
)

export const userQuestionAnswerRelations = relations(userQuestionAnswers, ({ one }) => ({
  user: one(users, {
    fields: [userQuestionAnswers.user_id],
    references: [users.id]
  }),
  question_selection: one(questionSelections, {
    fields: [userQuestionAnswers.question_selection_id],
    references: [questionSelections.id]
  })
}))

export const questionSelectionRelations = relations(questionSelections, ({ one, many }) => ({
  question: one(questions, {
    fields: [questionSelections.question_id],
    references: [questions.id]
  })
}))

export const questionRelations = relations(questions, ({ many }) => ({
  question_selections: many(questionSelections)
}))