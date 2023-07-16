import prismaClient from '../database/db.js'
import ResponseError from '../error/ResponseError.js'

export default class VoucherService {

    static getVoucher = async () => {
        
        const startVoucher = new Date('2023-07-19T10:00:00')
        const expirationDateVoucher = new Date(startVoucher.getFullYear(), startVoucher.getMonth() + 3, startVoucher.getDate(), startVoucher.getHours(), startVoucher.getMinutes(), startVoucher.getSeconds()).toISOString()
        const formatCreatedAt = startVoucher.toISOString()

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        let voucherCode = ''
        for (let i = 0; i < 10; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length)
          voucherCode += characters.charAt(randomIndex)
        }
        
        const checkVoucher = await prismaClient.voucher.findMany()
        if(checkVoucher.length >= 10) {
            await prismaClient.voucher.deleteMany({
                where: {
                    is_default: false,
                }
            })
        }
        const voucher = await prismaClient.voucher.create({
            data: {
                code_voucher: voucherCode,
                start_voucher: formatCreatedAt,
                expired_voucher: expirationDateVoucher
            }
        })
        
        return voucher
    }

    static useVoucher = async (request) => {

        if(request.total_price < 2000000) {
            throw new ResponseError(400, 'you must buy Rp.2.000.000 to get voucher')
        }
        const voucher = await prismaClient.voucher.findUnique({
            where: {
                id: +request.voucherId,
            },
            select: {
                start_voucher: true,
                expired_voucher: true,
                is_default: true
            }
        })
        if(voucher.is_default === true) {
            throw new ResponseError(400, 'Voucher has been used')
        }

        const startVoucher = new Date(voucher.start_voucher)
        const expiredVoucher = new Date(voucher.expired_voucher)
     
        if (startVoucher > expiredVoucher) {
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