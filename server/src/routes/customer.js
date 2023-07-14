import { Router } from 'express'
import CustomerController from '../controller/CustomerController.js'

const customer = Router()

customer.get('/:customerId', CustomerController.getOneCustomer)

export default customer