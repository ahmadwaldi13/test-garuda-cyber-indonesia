import prismaClient from '../src/database/db.js'

export const removeTestProduct = async () => {
    await prismaClient.product.deleteMany()
}

export const createTestProduct = async () => {
    const voucher = await prismaClient.voucher.create({
        data: {
            code_voucher: '485749fjdkdf987432',
            createdAt: new Date()
        }
    })
    await prismaClient.product.createMany({
        data: [
            {
                name: 'product test1',
                price: 2000000,
                quantity: 110,
                voucher_id: voucher.id
            },
            {
                name: 'product test2',
                price: 2000000,
                quantity: 110,
                voucher_id: voucher.id
            },
            {
                name: 'product test3',
                price: 2000000,
                quantity: 110,
                voucher_id: voucher.id
            }
        ]
    })
    return voucher
}


export const productTestData = async () => {
    const product =  await prismaClient.product.findFirst({
        where: {
            name: 'product test2'
        }
    })
    return product.id
}

export const createTestCustomer = async () => {
    await prismaClient.customer.create({
        data: {
            username: 'test customer',
            email: 'testcustomer@example.com',
            phone: '+62883944397'
        }
    })
}

export const customerTestData = async () => {
    const customer = await prismaClient.customer.findUnique({
        where: {
            email: 'testcustomer@example.com'
        }
    })

    return customer.id
}

export const removeTestCustomer = async () => {
    await prismaClient.customer.deleteMany()
}

export const removeTestVoucher = async () => {
    await prismaClient.voucher.deleteMany()
}

export const createTestVoucher = async () => {
    const voucher = await prismaClient.voucher.create({
        data: {
            code_voucher: 'ereureoriedhfdf-834',
            createdAt: new Date()
        }
    })
    await prismaClient.product.create({
        data: {
            name: 'product test1',
            price: 1000000,
            quantity: 10,
            voucher_id: voucher.id
        }
    })
    return voucher
}

export const updateTestVoucher = async () => {
    const voucher = await prismaClient.voucher.create({
        data: {
            code_voucher: 'fdfueouredlfdjfjd',
            createdAt: new Date()
        }
    })
    await prismaClient.product.create({
        data: {
            name: 'product test1',
            price: 1000000,
            quantity: 10,
            voucher_id: voucher.id
        }
    })
    await prismaClient.voucher.update({
        data: {
            is_default: true,
        },
        where: {
            id: voucher.id
        }
    })
    return voucher 
}

export const createTestVoucherExp = async () => {
    const voucher = await prismaClient.voucher.create({
        data: {
            code_voucher: 'ereufdfdfdferdf',
            createdAt: new Date()
        }
    })
    await prismaClient.product.create({
        data: {
            name: 'product test1',
            price: 1000000,
            quantity: 10,
            voucher_id: voucher.id
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
    return voucher
}