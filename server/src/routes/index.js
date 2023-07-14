import { Router } from 'express'
import product from './product.js'
import customer from './customer.js'
import voucher from './voucher.js'

const appRouter = Router()

appRouter.use('/products', product)
appRouter.use('/customer', customer)
appRouter.use('/useVoucher', voucher)

export default appRouter