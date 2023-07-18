import { Router } from 'express'
import product from './product.js'
import voucher from './voucher.js'
import register from './register.js'
import login from './login.js'

const appRouter = Router()

appRouter.use('/products', product)
appRouter.use('/register', register)
appRouter.use('/login', login)
appRouter.use('/voucher', voucher)

export default appRouter