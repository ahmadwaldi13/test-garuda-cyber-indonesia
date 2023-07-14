import supertest from 'supertest'
import app from '../src/app/app.js'
import { createTestCustomer, customerTestData, removeTestCustomer } from './testUtil.js'

describe('GET /api/v1/customer/:customerId', () => {
    beforeAll( async () => {
        await createTestCustomer()
    })
    afterAll( async () => {
        await removeTestCustomer()
    })
    it('should be able to getOne customer', async () => {
        const customerId = await customerTestData()
        const result = await supertest(app)
            .get(`/api/v1/customer/${customerId}`)

        expect(result.status).toBe(200)
        expect(result.body).toBeDefined()
        expect(result.body.data).toHaveProperty('id')

    })
    it('should be able to not found customer', async () => {
        const result = await supertest(app)
            .get(`/api/v1/customer/3897`)

        expect(result.status).toBe(404)
        expect(result.body.errors).toBe('Customer not found')

    })
})