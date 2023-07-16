import supertest from 'supertest'
import app from '../src/app/app.js'
import { 
    removeTestProduct,
    removeTestVoucher,
    createTestVoucher,
    updateTestVoucher,
    createTestVoucherExp,
    createTestForUseVoucher
 } from './testUtil.js'

describe('GET api/v1/voucher', () => {
    afterAll( async () => {
        await removeTestVoucher()
    })
    beforeAll(async () => {
        await createTestVoucher()
    })
    it('it should can get a voucher', async () => {
        const result = await supertest(app)
            .get('/api/v1/voucher')
        expect(result.status).toBe(200)
        expect(result.body.data.code_voucher).toBeDefined()
        expect(result.body.data.is_default).toBeDefined()
        expect(result.body.data.start_voucher).toBeDefined()
        expect(result.body.data.expired_voucher).toBeDefined()

    })

    it('should create vouchers after vocher length 10', async () => {
        const result = await supertest(app)
            .get('/api/v1/voucher')
        
        expect(result.status).toBe(200)
        expect(result.body.data).toBeDefined()

    })
})


describe('POST api/v1/voucher', () => {
    afterAll( async () => {
        await removeTestProduct()
        await removeTestVoucher()
    })
    it('should be able use voucher', async () => {
        const voucher = await createTestForUseVoucher()
        const result = await supertest(app)
            .post('/api/v1/voucher')
            .send({
                total_price: 2000000,
                voucherId: voucher.id
            })
        expect(result.status).toBe(200)
        expect(result.body.data.voucher).toBe(100000)
        expect(result.body.data.resultVoucher).toBe(1900000)
        expect(result.body.data).toHaveProperty('voucher')
        expect(result.body.data).toHaveProperty('resultVoucher')

    })
    it('should be able to total_price lessthan 2000000', async () => {
        const voucher = await createTestForUseVoucher()
        const result = await supertest(app)
            .post('/api/v1/voucher')
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
            .post('/api/v1/voucher')
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
            .post('/api/v1/voucher')
            .send({
                total_price: 2000000,
                voucherId: voucher.id
            })
        expect(result.status).toBe(400)
        expect(result.body.errors).toBe('Voucher expired')
    })
})