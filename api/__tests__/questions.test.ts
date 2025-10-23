import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'
import app from '../src/app.js'
import db from '../src/database/db.js'
import * as schema from '../src/database/schema.js'
import { reset } from 'drizzle-seed'

describe('Questions Route', () => {
  beforeEach(async() => {
    await reset(db, schema)
  })
  
  it('index', async () => {
    const response = await request(app).get('/api/questions')
    expect(response.status).toEqual(200)
  })

  it('create', async() => {
    const body = {
      title: 'Test',
      question_type: 'short_answer',
      required: false,
    }

    const response = await request(app).post('/api/questions').send(body)
    expect(response.status).toEqual(201)
  })

  it('destroy', async() => {
    const result = await db.insert(schema.questions).values({ title: 'Test', question_type: 'short_answer', required: false }).returning()
    const response = await request(app).delete(`/api/questions/${result[0].id}`)
    expect(response.status).toEqual(204)
  })
})