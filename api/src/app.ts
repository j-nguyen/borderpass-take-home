import express from 'express'

// Routes
import questionRoutes from './routes/questions'
// import userRoutes from './routes/users'

const app = express()
const port = 3000

// Middleware
app.use(express.json())

// Routes (API)
app.use('/api', questionRoutes)

// Listen to app
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
