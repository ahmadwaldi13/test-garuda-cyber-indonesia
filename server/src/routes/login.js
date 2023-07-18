import { Router } from 'express'
import CustomerController from '../controller/CustomerController.js'

const login = Router()

login.post('/', CustomerController.login)

export default login