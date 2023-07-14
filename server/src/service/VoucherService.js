import prismaClient from '../database/db.js'
import ResponseError from '../error/ResponseError.js'

export default class VoucherService {
    static useVoucher = async (request) => {
        if(request.total_price < 2000000) {
            throw new ResponseError(400, 'you must buy Rp.2.000.000 to get voucher')
        }
        const voucher = await prismaClient.voucher.findUnique({
            where: {
                id: +request.voucherId,
            }
        })
        if(voucher.is_default === true) {
            throw new ResponseError(400, 'Voucher has been used')
        }

        // const expirationSeconds = 1
        // const currentDate = new Date()
        // const createdDate = new Date(voucher.createdAt)
        // createdDate.setSeconds(createdDate.getSeconds() + expirationSeconds)

        const expirationMonths = 3
        const currentDate = new Date()
        const createdDate = new Date(voucher.createdAt)
        createdDate.setMonth(createdDate.getMonth() + expirationMonths)


        if (currentDate > createdDate) {
        throw new ResponseError(400, 'Voucher expired');
        }

       const resultVoucher = request.total_price - 100000
       await prismaClient.voucher.update({
        data: {
            is_default: true,
        },
        where: {
            id: +request.voucherId
        }
       })
       return {
            resultVoucher: resultVoucher,
            voucher: 100000
       }

    }
} 