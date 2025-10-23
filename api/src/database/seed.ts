// Default seeding
import db from './db.js'
import * as schema from './schema.js'
import { reset } from 'drizzle-seed'

async function main() {
  // Reset database
  await reset(db, schema)
  console.log('DB Reset')

const questions: { id: number; title: string; question_type: any; required?: boolean; }[] = [
  {
    id: 1,
    title: 'How old are you?',
    question_type: 'short_answer',
  },
  {
    id: 2,
    title: 'How are you today?',
    question_type: 'long_answer',
  },
  {
    id: 3,
    title: 'What is your favourite sport?',
    question_type: 'dropdown',
  },
  {
    id: 4,
    title: 'What is the capital of Canada?',
    question_type: 'multiple_choice',
    required: false,
  },
  {
    id: 5,
    title: 'What social media platform do you use?',
    question_type: 'checkbox'
  }
  ]

  const questionSelections = [
    {
      question_id: 3,
      question_text: 'Basketball',
    },
    {
      question_id: 3,
      question_text: 'Soccer',
    },
    {
      question_id: 3,
      question_text: 'Football',
    },
    {
      question_id: 3,
      question_text: 'Other',
    },
    {
      question_id: 4,
      question_text: 'Ottawa',
    },
    {
      question_id: 4,
      question_text: 'Toronto',
    },
    {
      question_id: 4,
      question_text: 'Vancouver',
    },
    {
      question_id: 4,
      question_text: 'Montreal',
    },
    {
      question_id: 5,
      question_text: 'Facebook',
    },
    {
      question_id: 5,
      question_text: 'X (Twitter)',
    },
    {
      question_id: 5,
      question_text: 'Instagram',
    },
    {
      question_id: 5,
      question_text: 'Snapchat',
    },
  ]

  // TODO: The right thing to do here is to create the typescript type definitions, but this is seed data.
  await db.insert(schema.questions).overridingSystemValue().values(questions)
  await db.insert(schema.questionSelections).values(questionSelections)

  console.log('Done')
}

main()