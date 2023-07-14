import CustomerService from '../service/CustomerService.js'

export default class CustomerController {
    static getOneCustomer = async (req, res, next) => {
        try {
            const customerId = req.params.customerId
            const result = await CustomerService.getOneCustomer(customerId)
            res.status(200).json({
                data: result
            })
        } catch (err) {
            next(err)
        }
    }
}