import express from 'express'
import cors from 'cors'

// Routes
import questionRoutes from './routes/questions.js'
import userRoutes from './routes/users.js'
import userQuestionAnswerRoutes from './routes/user-question-answers.js'

const app = express()
const port = 3000

// Middleware
app.use(express.json())
app.use(cors())

// Routes (API)
app.use('/api', questionRoutes)
app.use('/api', userRoutes)
app.use('/api', userQuestionAnswerRoutes)

// Listen to app
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

export default app