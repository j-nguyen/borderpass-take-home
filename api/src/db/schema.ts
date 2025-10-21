import { integer, boolean, pgEnum, pgTable, text, timestamp, varchar, uniqueIndex } from 'drizzle-orm/pg-core';

// To make it easier, we will instantiate the schema tables through here

export const questionTypes = pgEnum('question_types', ['dropdown', 'multiple_choice', 'short_answer', 'long_answer', 'checkbox'])

/**
 * ERD Layout:
 * 
 * Questions Table
 * ID, title, question_type, required, created_at, updated_at
 * 
 * question_selections Table
 * ID, question_id, answer, created_at, updated_at
 * 
 * Users Table
 * ID, email, created_at, updated_at
 * 
 * User question_selections Table
 * ID, user_id, question_selections_id, created_at, updated_at
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
    question_selection_id: integer().references(() => questionSelections.id, { onDelete: 'cascade' }).notNull(),
    ...timestamps,
  },
  (t) => [
    uniqueIndex('user_id_question_selection_id').on(t.user_id, t.question_selection_id)
  ]
)