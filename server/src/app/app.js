import express from 'express'
import appRouter from '../routes/index.js'
import { errorMiddleware } from '../middleware/errorMiddleware.js'

const app = express()

app.use(express.json())
app.use('/api/v1', appRouter)
app.use(errorMiddleware)


export default app