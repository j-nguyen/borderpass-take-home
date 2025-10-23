import request from 'supertest'
import { beforeEach, describe, expect, test } from 'vitest'
import app from '../src/app.js'
import db from '../src/database/db.js'
import * as schema from '../src/database/schema.js'
import { reset } from 'drizzle-seed'

describe('User Question Route', () => {
  beforeEach(async() => {
    await reset(db, schema)
  })
  
  test('index', async () => {
    const response = await request(app).get('/api/user_question_answers')
    expect(response.status).toEqual(200)
  })

  test('create', async() => {
    // create mock
    const question = await db.insert(schema.questions).values({ title: 'Test', question_type: 'dropdown', required: true }).returning()
    const user = await db.insert(schema.users).values({ email: 'test2@example.com' }).returning()

    const data = {
      question_id: question[0].id,
      user_id: user[0].id,
      answer: 'Random text',
    }

    const response = await request(app).post('/api/user_question_answers').send(data)
    expect(response.status).toEqual(201)
  })

  test('show', async() => {
    // create mock
    const question = await db.insert(schema.questions).values({ title: 'Test', question_type: 'dropdown', required: true }).returning()
    const user = await db.insert(schema.users).values({ email: 'test2@example.com' }).returning()
    const userQuestionAnswer = await db.insert(schema.userQuestionAnswers).values({ question_id: question[0].id, user_id: user[0].id, answer: 'test' }).returning()

    const response = await request(app).get(`/api/user_question_answers/${userQuestionAnswer[0].id}`)
    expect(response.status).toEqual(200)
  })

  test('patch', async() => {
    // create mock
    const question = await db.insert(schema.questions).values({ title: 'Test', question_type: 'dropdown', required: true }).returning()
    const user = await db.insert(schema.users).values({ email: 'test@example.com' }).returning()
    const userQuestionAnswer = await db.insert(schema.userQuestionAnswers).values({ question_id: question[0].id, user_id: user[0].id, answer: 'test' }).returning()

    const data = {
      question_id: question[0].id,
      user_id: user[0].id,
      answer: 'Random text',
    }

    const response = await request(app).patch(`/api/user_question_answers/${userQuestionAnswer[0].id}`).send(data)
    expect(response.status).toEqual(200)
  })
})