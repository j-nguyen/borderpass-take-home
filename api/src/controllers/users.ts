import { sql, eq } from 'drizzle-orm'
import db from '../database/db.js'
import { users, users as usersTable } from '../database/schema.js'
import { validationResult } from 'express-validator'

// Just using this as an example, since this is a simple questionnaire app, I did based on email
// If more time, we can setup a login system.
export const getUserByEmail = async(req, res) => { 
  // Go through our query
  const result = await db.query.users.findFirst({
    where: eq(sql`LOWER(${users.email})`, sql`LOWER(${sql.placeholder('email')})`)
  })
  .prepare('users')
  .execute({ email: req.query.email })

  if (!result) {
    return res.status(404).json({ message: 'User Not Found' })
  }

  res.status(200).json(result)
}

export const createUser = async(req, res) => {
  const params = {
    email: req.body.email,
  }

  // Determine and check if email exists
  const result = await db.query.users.findFirst({
    where: eq(sql`LOWER(${users.email})`, sql`LOWER(${sql.placeholder('email')})`)
  })
  .prepare('users')
  .execute({ email: params.email })

  // If there's a result, error out and say that a user has already been created
  if (result) {
    return res.status(422).json({ message: 'User has already been created' })
  }

  // Create the user
  const newUser = await db.insert(usersTable).values(params).returning()

  res.status(201).json(newUser)
}

export default {
  getUserByEmail,
  createUser
}