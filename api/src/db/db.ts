import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './schema.js'

// Setup a singleton to help instantiate db connection
const db = drizzle(process.env.DATABASE_URL, { logger: true, schema })

export default db