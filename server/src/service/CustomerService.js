import prismaClient from '../database/db.js'
import ResponseError from '../error/ResponseError.js'

export default class CustomerService {
    static getOneCustomer = async (customerId) => {
        const result = await prismaClient.customer.findUnique({
            where: {
                id: +customerId,
            }
        })
        if(!result) throw new ResponseError(404, 'Customer not found')

        return result
    }
}