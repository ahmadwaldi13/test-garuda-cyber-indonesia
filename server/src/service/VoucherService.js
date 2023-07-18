import prismaClient from '../database/db.js'
import ResponseError from '../error/ResponseError.js'

export default class VoucherService {

    static useVoucher = async (request) => {

        
        if(request.total_price < 2000000) {
            throw new ResponseError(400, 'you must buy Rp.2.000.000 to get voucher')
        }
        const voucher = await prismaClient.voucher.findUnique({
            where: {
                code_voucher: request.code_voucher,
            },
            select: {
                code_voucher: true,
                start_voucher: true,
                expired_voucher: true
            }
        })
        if(request.customer_id) {
            const checkCustomerUseVoucher = await prismaClient.customer.findUnique({
                where: {
                    id: +request.customer_id
                },
                select: {
                    code_voucher: true,
                }
            })
            if(checkCustomerUseVoucher && checkCustomerUseVoucher.code_voucher === request.code_voucher) {
                throw new ResponseError(400, 'Voucher has been used')
            }
        }

        const startVoucher = new Date(voucher.start_voucher)
        const expiredVoucher = new Date(voucher.expired_voucher)
     
        if (startVoucher > expiredVoucher) {
        throw new ResponseError(400, 'Voucher expired');
        }

       const resultVoucher = request.total_price - 10000
       if(request.customer_id) {
        await prismaClient.customer.update({
            data: {
                code_voucher: request.code_voucher
            },
            where: {
               id : +request.customer_id
            }
           })
       }
       return {
            customer_id: request.customer_id,
            resultVoucher: resultVoucher,
            voucher: 10000
       }

    }
} 