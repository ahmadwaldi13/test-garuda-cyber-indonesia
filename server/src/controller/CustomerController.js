import CustomerService from '../service/CustomerService.js'

export default class CustomerController {
    static register = async (req, res, next) => {
        try {
            const result = await CustomerService.register(req.body)
            res.status(201).json({
                data: result
            })
        } catch (err) {
            next(err)
        }
    }

    static login = async (req, res, next) => {
        try {
            const result = await CustomerService.login(req.body)
            res.cookie('customerId', result.customerId)
            res.cookie('token', result.token, {
                httpOnly: false,
                path: '/',
                maxAge: 24 * 60 * 60 * 1000
            }).end()
        } catch (err) {
            next(err)
        }
    }
}