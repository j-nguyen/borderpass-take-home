import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/database/schema.ts',
  dbCredentials: {
    url: process.env.TEST_DATABASE_URL,
  },
  verbose: true
});