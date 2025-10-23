import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'
import app from '../src/app.js'
import db from '../src/database/db.js'
import * as schema from '../src/database/schema.js'
import { reset } from 'drizzle-seed'

describe('User Route', () => {
  beforeEach(async() => {
    await reset(db, schema)
  })
  
  it('getUserByEmail - no user found', async () => {
    const response = await request(app).get('/api/users?email=test@example.com')
    expect(response.status).toEqual(404)
  })

  it('getUserByEmail - user found', async () => {
    await db.insert(schema.users).values({ email: 'test@example.com' }).returning()
    const response = await request(app).get('/api/users?email=test@example.com')
    expect(response.status).toEqual(200)
  })
})