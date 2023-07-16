import { Router } from 'express'
import product from './product.js'
import voucher from './voucher.js'
import CustomerController from '../controller/CustomerController.js'

const appRouter = Router()

appRouter.use('/products', product)
appRouter.use('/register', CustomerController.register)
appRouter.use('/login', CustomerController.login)
appRouter.use('/voucher', voucher)

export default appRouter