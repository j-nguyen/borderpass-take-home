// Default seeding
import db from './db'
import * as schema from './schema.js'
import { reset } from 'drizzle-seed'

async function main() {
  // Reset database
  await reset(db, schema)
  console.log('DB Reset')

  const questions = [
    {
      title: 'How old are you?',
      question_type: 'short_answer',
      required: true,
    },
    {
      title: 'How are you today?',
      question_type: 'long_answer',
      required: true,
    },
    {
      title: ''
    }
  ]

  console.log('sup')
}

main()