import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'

// Setup a singleton to help instantiate db connection
const db = drizzle(process.env.DATABASE_URL)

export default db