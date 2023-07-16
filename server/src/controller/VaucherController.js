import VoucherService from '../service/VoucherService.js'

export default class VoucherController {
    
    static getVoucher = async (req, res, next) => {
        try {
            const voucher = await VoucherService.getVoucher()
            res.status(200).json({
                data: voucher
            })
        } catch (err) {
            next(err)
        }
    }
    
    static useVoucher = async (req, res, next) => {
        try {
            const result = await VoucherService.useVoucher(req.body)
            res.status(200).json({
                data: result
            }).end()
        } catch (err) {
            next(err)
        }

    }
}