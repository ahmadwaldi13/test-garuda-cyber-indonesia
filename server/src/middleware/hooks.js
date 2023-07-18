import prismaClient from '../database/db.js'

export const createProduct = async () => {
    const result = await prismaClient.product.findMany()

    if(result.length === 0) {
        const startVoucher = new Date('2023-07-17T10:00:00')
        const expirationDateVoucher = new Date(startVoucher.getFullYear(), startVoucher.getMonth() + 3, startVoucher.getDate(), startVoucher.getHours(), startVoucher.getMinutes(), startVoucher.getSeconds()).toISOString()
        const formatCreatedAt = startVoucher.toISOString()

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        let voucherCode = ''
        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length)
            voucherCode += characters.charAt(randomIndex)
        }

        const voucher = await prismaClient.voucher.create({
            data: {
                code_voucher: voucherCode,
                start_voucher: formatCreatedAt,
                expired_voucher: expirationDateVoucher
            }
        })

        await prismaClient.product.createMany({
            data: [
                {
                    name: 'Epiphone DR-100',
                    price: 2000000,
                    quantity: 10,
                    code_voucher: voucher.code_voucher,
                },
                {
                    name: 'Yamaha APX 500 ii Akustik dan Elektrik',
                    price: 600000,
                    quantity: 20,
                    code_voucher: voucher.code_voucher,
                },
                {
                    name: 'Gitar akustik elektrik apx500 ',
                    price: 500000,
                    quantity: 10,
                    code_voucher: voucher.code_voucher,
                }
            ]
        })
    }
}