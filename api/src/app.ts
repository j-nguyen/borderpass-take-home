import express from 'express'

// Routes
import questionRoutes from './routes/questions.js'
import userRoutes from './routes/users.js'

const app = express()
const port = 3000

// Middleware
app.use(express.json())

// Routes (API)
app.use('/api', questionRoutes)
app.use('/api', userRoutes)

// Listen to app
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
