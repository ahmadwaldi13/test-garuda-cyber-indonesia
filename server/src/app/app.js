import express from 'express'
import appRouter from '../routes/index.js'
import { errorMiddleware } from '../middleware/errorMiddleware.js'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import { createProduct } from '../middleware/hooks.js'

const app = express()
dotenv.config()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
await createProduct()
app.use('/api/v1', appRouter) 
app.use(errorMiddleware)


export default app