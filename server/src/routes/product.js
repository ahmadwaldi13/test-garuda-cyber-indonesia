import { Router } from 'express'
import ProductController from '../controller/ProductController.js'

const product = Router()

product.get('/', ProductController.getAllProduct)
product.get('/:productId', ProductController.getOneProduct)

export default product