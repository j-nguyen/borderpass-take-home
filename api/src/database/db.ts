import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './schema.js'

// Setup a singleton to help instantiate db connection
let db

if (process.env.NODE_ENV === 'test') {
  db = drizzle(process.env.TEST_DATABASE_URL, { logger: false, schema })
} else {
  db = drizzle(process.env.TEST_DATABASE_URL, { logger: true, schema })
}

export default db