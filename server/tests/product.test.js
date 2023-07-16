import supertest from 'supertest'
import app from '../src/app/app.js'
import { 
    createTestProduct, 
    removeTestProduct,
    productTestData,
 } from './testUtil.js'

describe('GET api/v1/products', () => {
    beforeAll( async () => {
        await createTestProduct()
    })
    afterAll( async () => {
        await removeTestProduct()
    })

    it('should be able to getAll product with store', async () => {
        const results = await supertest(app)
            .get(`/api/v1//products`)

        expect(results.status).toBe(200)
        expect(results.body.data).toBeDefined()

    })

    it('should be able to not found products', async () => {
        await removeTestProduct()
        const results = await supertest(app)
            .get(`/api/v1/products`)

        expect(results.status).toBe(404)
        expect(results.body.errors).toBe('Product not found')
        
    })
})


describe('GET api/v1/products/:productId', () => {
    beforeAll( async () => {
        await createTestProduct()
    })
    afterAll( async () => {
        await removeTestProduct()
    })
    it('should be able to getOne product', async () => {
        const productId = await productTestData()
        const result = await supertest(app)
            .get(`/api/v1/products/${productId}`)
            
        expect(result.status).toBe(200)
        expect(result.body.data).toHaveProperty('id')
        expect(result.body.data).toHaveProperty('name')
        expect(result.body.data).toHaveProperty('price')
        expect(result.body.data).toHaveProperty('quantity')

    })
    it('should be able to not found product', async () => {
        const result = await supertest(app)
            .get(`/api/v1/products/${10}`)
        console.info(result.body)
        expect(result.status).toBe(404)
        expect(result.body.errors).toBe('Product not found')

    })
})