import { Router } from 'express'
import CustomerController from '../controller/CustomerController.js'

const register = Router()

register.post('/', CustomerController.register)

export default register