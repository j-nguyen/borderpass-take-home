import { integer, boolean, pgEnum, pgTable, text, timestamp, unique, varchar } from 'drizzle-orm/pg-core';

// To make it easier, we will instantiate the schema tables through here

export const questionTypes = pgEnum('question_types', ['dropdown', 'multiple_choice', 'short_answer', 'long_answer', 'checkbox'])

/**
 * ERD Layout:
 * 
 * Questions Table
 * ID, title, question_type, required, created_at, updated_at
 * 
 * Question_Answers Table
 * ID, question_id, answer, created_at, updated_at
 * 
 * Users Table
 * ID, email, created_at, updated_at
 * 
 * User Question_Answers Table
 * ID, user_id, question_answers_id, created_at, updated_at
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

export const questionAnswers = pgTable(
  'question_answers',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    question_id: integer().references(() => questions.id, { onDelete: 'cascade' }).notNull(),
    answer: text('title').notNull(),
    ...timestamps,
  }
)

export const users = pgTable(
  'users',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    email: varchar('email').notNull().unique(),
    ...timestamps,
  }
)

export const userQuestionAnswers = pgTable(
  'user_question_answers',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    user_id: integer().references(() => users.id, { onDelete: 'cascade' }).notNull(),
    question_answer_id: integer().references(() => questionAnswers.id, { onDelete: 'cascade' }).notNull(),
    ...timestamps,
  },
  (t) => [
    unique('user_id_question_answer_id').on(t.user_id, t.question_answer_id)
  ]
)