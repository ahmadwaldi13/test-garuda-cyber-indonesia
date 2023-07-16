import prismaClient from '../src/database/db.js'
import bcrypt from 'bcrypt'

// Test For Customer
export const createTestCustomer = async () => {

    await prismaClient.customer.create({
        data: {
            username: 'ahmad',
            email: 'ahmad123@example.com',
            phone: '+62883944397',
            password: ''
        }
    })
}

export const createTestCustomerForLogin = async () => {
    await prismaClient.customer.create({
        data: {
            username: 'ahmad',
            email: 'ahmad123@example.com',
            phone: '+62883944397',
            password: await bcrypt.hash('ahmad111', 10)
        }
    })
}

export const removeTestCustomer = async () => {
    await prismaClient.customer.deleteMany()
}


// Test For Voucher 
export const removeTestVoucher = async () => {
    await prismaClient.voucher.deleteMany()
}

export const createTestVoucher = async () => {
    for(let i = 0; i < 10; i++) {
        const startVoucher = new Date('2023-07-19T10:00:00')
        const expirationDateVoucher = new Date(startVoucher.getFullYear(), startVoucher.getMonth() + 3, startVoucher.getDate(), startVoucher.getHours(), startVoucher.getMinutes(), startVoucher.getSeconds()).toISOString()
        const formatStarVoucher = startVoucher.toISOString()

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        let voucherCode = ''
        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length)
            voucherCode += characters.charAt(randomIndex)
        }
        await prismaClient.voucher.createMany({
            data: {
                code_voucher: voucherCode,
                start_voucher: formatStarVoucher,
                expired_voucher: expirationDateVoucher
            },
        })
    }
}

export const updateTestVoucher = async () => {
    const startVoucher = new Date('2023-07-19T10:00:00')
    const expirationDateVoucher = new Date(startVoucher.getFullYear(), startVoucher.getMonth() + 3, startVoucher.getDate(), startVoucher.getHours(), startVoucher.getMinutes(), startVoucher.getSeconds()).toISOString()
    const formatStarVoucher = startVoucher.toISOString()

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let voucherCode = ''
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        voucherCode += characters.charAt(randomIndex)
    }

    const voucher = await prismaClient.voucher.create({
        data: {
            code_voucher: voucherCode,
            start_voucher: formatStarVoucher,
            expired_voucher: expirationDateVoucher
        },
    })
    await prismaClient.voucher.update({
        data: {
            is_default: true,
        },
        where: {
            id: +voucher.id
        }
    })
    return voucher 
}

export const createTestVoucherExp = async () => {
    const startVoucher = new Date('2023-07-19T10:00:00')
    const expirationDateVoucher = new Date(startVoucher.getTime() - 1000).toISOString();
    const formatStarVoucher = startVoucher.toISOString()

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let voucherCode = ''
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        voucherCode += characters.charAt(randomIndex)
    }
    const voucher = await prismaClient.voucher.create({
        data: {
            code_voucher: voucherCode,
            start_voucher: formatStarVoucher,
            expired_voucher: expirationDateVoucher
        },
    })

    function delaySync(ms) {
        const start = Date.now();
        let now = start;
        
        while (now - start < ms) {
            now = Date.now();
        }
    }
    delaySync(3000)
    return voucher
}

export const createTestForUseVoucher = async () => {
    const startVoucher = new Date('2023-07-19T10:00:00')
    const expirationDateVoucher = new Date(startVoucher.getFullYear(), startVoucher.getMonth() + 3, startVoucher.getDate(), startVoucher.getHours(), startVoucher.getMinutes(), startVoucher.getSeconds()).toISOString()
    const formatStarVoucher = startVoucher.toISOString()

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let voucherCode = ''
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        voucherCode += characters.charAt(randomIndex)
    }

    return await prismaClient.voucher.create({
        data: {
            code_voucher: voucherCode,
            start_voucher: formatStarVoucher,
            expired_voucher: expirationDateVoucher
        },
    })
} 


// Test For Product
export const removeTestProduct = async () => {
    await prismaClient.product.deleteMany()
}

export const createTestProduct = async () => {
    await prismaClient.product.createMany({
        data: [
            {
                name: 'product test1',
                price: 2000000,
                quantity: 110,
            },
            {
                name: 'product test2',
                price: 2000000,
                quantity: 110,
            },
            {
                name: 'product test3',
                price: 2000000,
                quantity: 110,
            }
        ]
    })
}

export const productTestData = async () => {
    const product =  await prismaClient.product.findFirst({
        where: {
            name: 'product test2'
        }
    })
    return product.id
}





