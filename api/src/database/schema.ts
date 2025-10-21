import { bigint, boolean, pgEnum, pgTable, text, timestamp, unique, varchar } from 'drizzle-orm/pg-core';

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
    id: bigint({ mode: 'bigint' }).primaryKey().generatedAlwaysAsIdentity(),
    title: varchar('title').notNull(),
    question_type: questionTypes().default('short_answer').notNull(),
    required: boolean().default(true).notNull(),
    ...timestamps
  }
)

export const questionAnswers = pgTable(
  'question_answers',
  {
    id: bigint({ mode: 'bigint' }).primaryKey().generatedAlwaysAsIdentity(),
    question_id: bigint({ mode: 'bigint' }).references(() => questions.id, { onDelete: 'cascade' }).notNull(),
    answer: text('title').notNull(),
    ...timestamps,
  }
)

export const users = pgTable(
  'users',
  {
    id: bigint({ mode: 'bigint' }).primaryKey().generatedAlwaysAsIdentity(),
    email: varchar('email').notNull().unique(),
    ...timestamps,
  }
)

export const userQuestionAnswers = pgTable(
  'user_question_answers',
  {
    id: bigint({ mode: 'bigint' }).primaryKey().generatedAlwaysAsIdentity(),
    user_id: bigint({ mode: 'bigint' }).references(() => users.id, { onDelete: 'cascade' }).notNull(),
    question_answer_id: bigint({ mode: 'bigint' }).references(() => questionAnswers.id, { onDelete: 'cascade' }).notNull(),
    ...timestamps,
  },
  (t) => [
    unique('user_id_question_answer_id').on(t.user_id, t.question_answer_id)
  ]
)