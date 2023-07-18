import { Router } from 'express'
import VoucherController from "../controller/VaucherController.js"

const voucher = Router()

voucher.post('/voucher', VoucherController.useVoucher)


export default voucher