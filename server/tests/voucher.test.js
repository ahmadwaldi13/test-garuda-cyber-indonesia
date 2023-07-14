import supertest from 'supertest'
import app from '../src/app/app.js'
import { 
    createTestProduct, 
    removeTestProduct,
    removeTestVoucher,
    createTestVoucher,
    updateTestVoucher,
    createTestVoucherExp
 } from './testUtil.js'


describe('POST api/v1/useVoucher', () => {
    afterAll( async () => {
        await removeTestProduct()
        await removeTestVoucher()
    })
    it('should be able use voucher', async () => {
        const product = await createTestProduct()
        const result = await supertest(app)
            .post('/api/v1/useVoucher')
            .send({
                total_price: 2000000,
                voucherId: product.id
            })
        expect(result.status).toBe(200)
        expect(result.body.data.voucher).toBe(100000)
        expect(result.body.data.resultVoucher).toBe(1900000)
        expect(result.body.data).toHaveProperty('voucher')
        expect(result.body.data).toHaveProperty('resultVoucher')

    })
    it('should be able to total_price lessthan 2000000', async () => {
        const voucher = await createTestVoucher()
        const result = await supertest(app)
            .post('/api/v1/useVoucher')
            .send({
                total_price: 1000000,
                voucherId: voucher.id
            })
        expect(result.status).toBe(400)
        expect(result.body.errors).toBe('you must buy Rp.2.000.000 to get voucher')
    })
    it('should be able to is_default voucher together with true', async () => {
        const voucher = await updateTestVoucher()
        const result = await supertest(app)
            .post('/api/v1/useVoucher')
            .send({
                total_price: 2000000,
                voucherId: voucher.id
            })
        expect(result.status).toBe(400)
        expect(result.body.errors).toBe('Voucher has been used')
    })
    it('should be able to voucher expired', async () => {
        const voucher = await createTestVoucherExp()
        const result = await supertest(app)
            .post('/api/v1/useVoucher')
            .send({
                total_price: 2000000,
                voucherId: voucher.id
            })
        console.info(result.body)
        expect(result.status).toBe(400)
        expect(result.body.errors).toBe('Voucher expired')
    })
})