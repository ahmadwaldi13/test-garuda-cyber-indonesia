import supertest from 'supertest'
import app from '../src/app/app.js'
import { 
    removeTestProduct,
    removeTestVoucher,
    createTestForUseVoucherNotLogin,
    createTestForUseVoucherLogin,
    updateTestVoucher,
    createTestVoucherExp,
    createTestVoucherExpLogin,
    removeTestCustomer,
    createTestForUseVoucherLoginErr
 } from './testUtil.js'


describe('POST api/v1/voucher', () => {
    afterAll( async () => {
        await removeTestProduct()
        await removeTestVoucher()
        await removeTestCustomer()
    })
    it('should be able use voucher customer before login', async () => {
        const voucher = await createTestForUseVoucherNotLogin()
        const result = await supertest(app)
            .post('/api/v1/voucher')
            .send({
                total_price: 2000000,
                code_voucher: voucher.code_voucher
            })
        expect(result.status).toBe(200)
        expect(result.body.data.voucher).toBe(10000)
        expect(result.body.data.resultVoucher).toBe(1990000)
        expect(result.body.data).toHaveProperty('voucher')
        expect(result.body.data).toHaveProperty('resultVoucher')
        expect(result.body.data.customer_id).toBeUndefined()

    })

    it('should be able use voucher customer after login', async () => {
        const voucher = await createTestForUseVoucherLogin()
        const result = await supertest(app)
            .post('/api/v1/voucher')
            .send({
                customer_id: voucher.customer.id,
                total_price: 2000000,
                code_voucher: voucher.product.code_voucher
            })
        expect(result.status).toBe(200)
        expect(result.body.data.voucher).toBe(10000)
        expect(result.body.data.resultVoucher).toBe(1990000)
        expect(result.body.data).toHaveProperty('voucher')
        expect(result.body.data).toHaveProperty('resultVoucher')
        expect(result.body.data).toHaveProperty('customer_id')

    })

    it('should be able to total_price lessthan 2000000 after login', async () => {
        const voucher = await createTestForUseVoucherLoginErr()
        const result = await supertest(app)
            .post('/api/v1/voucher')
            .send({
                customer_id: voucher.customer.id,
                total_price: 1000000,
                code_voucher: voucher.product.code_voucher
            })
        expect(result.status).toBe(400)
        expect(result.body.errors).toBe('you must buy Rp.2.000.000 to get voucher')
    })

    it('should be able to total_price lessthan 2000000 before login', async () => {
        const voucher = await createTestForUseVoucherNotLogin()
        const result = await supertest(app)
            .post('/api/v1/voucher')
            .send({
                total_price: 1000000,
                code_voucher: voucher.code_voucher
            })
        expect(result.status).toBe(400)
        expect(result.body.errors).toBe('you must buy Rp.2.000.000 to get voucher')
    })
    

    it('should be able voucher have been used by the customer', async () => {
        const voucher = await updateTestVoucher()
        const result = await supertest(app)
            .post('/api/v1/voucher')
            .send({
                customer_id: voucher.customer.id,
                total_price: 2000000,
                code_voucher: voucher.product.code_voucher
            })
        expect(result.status).toBe(400)
        expect(result.body.errors).toBe('Voucher has been used')
    })

    it('should be able to voucher expired before login', async () => {
        const voucher = await createTestVoucherExp()
        const result = await supertest(app)
            .post('/api/v1/voucher')
            .send({
                total_price: 2000000,
                code_voucher: voucher.code_voucher
            })
        expect(result.status).toBe(400)
        expect(result.body.errors).toBe('Voucher expired')
    })

    it('should be able to voucher expired after login', async () => {
        const voucher = await createTestVoucherExpLogin()
        const result = await supertest(app)
            .post('/api/v1/voucher')
            .send({
                customer_id: voucher.customer.id,
                total_price: 2000000,
                code_voucher: voucher.product.code_voucher
            })
        expect(result.status).toBe(400)
        expect(result.body.errors).toBe('Voucher expired')
    })
})