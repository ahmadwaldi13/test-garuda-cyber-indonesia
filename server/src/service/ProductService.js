import prismaClient from '../database/db.js'
import ResponseError from '../error/ResponseError.js'

export default class ProductService {
    static getAllProduct = async () => {
        const results = await prismaClient.product.findMany()
        if(results.length === 0) {
            throw new ResponseError(404, 'Product not found')
        }
        return results
    }

    static getOneProduct = async (productId) => {

        const result = await prismaClient.product.findUnique({
            where: {
                id: +productId
            }
        })
        if(!result) {
            throw new ResponseError(404, 'Product not found')
        }
        return result
    }
}