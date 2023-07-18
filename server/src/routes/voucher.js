import { Router } from 'express'
import VoucherController from "../controller/VaucherController.js"

const voucher = Router()

voucher.post('/', VoucherController.useVoucher)


export default voucher