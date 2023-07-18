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

export const updateTestVoucher = async () => {
    const startVoucher = new Date('2023-07-19T10:00:00')
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

    const product = await prismaClient.product.create({
        data: {
            name: 'test product 10',
            price: 2000000,
            quantity: 100,
            code_voucher: voucher.code_voucher,
        }
    })

    const customer = await prismaClient.customer.create({
        data: {
            username: 'annisa',
            email: 'annisa@example.com',
            phone: '+62883944397',
            password: await bcrypt.hash('ahmad111', 10)
        }
    })


    await prismaClient.customer.update({
        data: {
            code_voucher: product.code_voucher
        },
        where: {
            id: customer.id,
        }
    })

    return {
        customer,
        product
    }

}

export const createTestVoucherExp = async () => {
    const startVoucher = new Date('2023-07-19T10:00:00');
    const expirationDateVoucher = new Date(startVoucher.getTime() - 1000).toISOString();
    const formatStartVoucher = startVoucher.toISOString();

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let voucherCode = ''
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        voucherCode += characters.charAt(randomIndex)
    }

    const voucher = await prismaClient.voucher.create({
        data: {
            code_voucher: voucherCode,
            start_voucher: formatStartVoucher,
            expired_voucher: expirationDateVoucher
        }
    })

    const product = await prismaClient.product.create({
        data: {
            name: 'test product 7',
            price: 2000000,
            quantity: 100,
            code_voucher: voucher.code_voucher,
        }
    })

    function delaySync(ms) {
        const start = Date.now();
        let now = start;
        
        while (now - start < ms) {
            now = Date.now();
        }
    }
    delaySync(3000)
    return product
}

export const createTestVoucherExpLogin = async () => {
    const startVoucher = new Date('2023-07-19T10:00:00');
    const expirationDateVoucher = new Date(startVoucher.getTime() - 1000).toISOString();
    const formatStartVoucher = startVoucher.toISOString();

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let voucherCode = ''
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        voucherCode += characters.charAt(randomIndex)
    }

    const voucher = await prismaClient.voucher.create({
        data: {
            code_voucher: voucherCode,
            start_voucher: formatStartVoucher,
            expired_voucher: expirationDateVoucher
        }
    })

    const product = await prismaClient.product.create({
        data: {
            name: 'test product 5',
            price: 2000000,
            quantity: 100,
            code_voucher: voucher.code_voucher,
        }
    })

    const customer = await prismaClient.customer.create({
        data: {
            username: 'waldiarridho',
            email: 'waldiarridho@example.com',
            phone: '+62883944397',
            password: await bcrypt.hash('ahmad111', 10)
        }
    })

    function delaySync(ms) {
        const start = Date.now();
        let now = start;
        
        while (now - start < ms) {
            now = Date.now();
        }
    }
    delaySync(3000)
    return {
        customer,
        product
    }
}

export const createTestForUseVoucherNotLogin = async () => {
    const startVoucher = new Date('2023-07-19T10:00:00')
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

        const product = await prismaClient.product.create({
            data: {
                name: 'test product 1',
                price: 2000000,
                quantity: 100,
                code_voucher: voucher.code_voucher,
            }
        })

        return product
}

export const createTestForUseVoucherLogin = async () => {
    const startVoucher = new Date('2023-07-19T10:00:00')
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
        
        const product = await prismaClient.product.create({
            data: {
                name: 'test product 2',
                price: 2000000,
                quantity: 100,
                code_voucher: voucher.code_voucher,
            }
        })

        const customer = await prismaClient.customer.create({
            data: {
                username: 'jamal',
                email: 'jamal@example.com',
                phone: '+62883944397',
                password: await bcrypt.hash('ahmad111', 10)
            }
        })
        
        return {
            customer,
            product
        }
} 

export const createTestForUseVoucherLoginErr = async () => {
    const startVoucher = new Date('2023-07-19T10:00:00')
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
        
        const product = await prismaClient.product.create({
            data: {
                name: 'test product 2',
                price: 2000000,
                quantity: 100,
                code_voucher: voucher.code_voucher,
            }
        })

        const customer = await prismaClient.customer.create({
            data: {
                username: 'jamilun',
                email: 'jamilun@example.com',
                phone: '+62883944397',
                password: await bcrypt.hash('ahmad111', 10)
            }
        })
        
        return {
            customer,
            product
        }
} 

// Test For Product
export const removeTestProduct = async () => {
    await prismaClient.product.deleteMany()
}

export const createTestProduct = async () => {
    const startVoucher = new Date('2023-07-19T10:00:00')
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
                name: 'product test1',
                price: 2000000,
                quantity: 110,
                code_voucher: voucher.code_voucher,
            },
            {
                name: 'product test2',
                price: 2000000,
                quantity: 110,
                code_voucher: voucher.code_voucher,
            },
            {
                name: 'product test3',
                price: 2000000,
                quantity: 110,
                code_voucher: voucher.code_voucher,
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





