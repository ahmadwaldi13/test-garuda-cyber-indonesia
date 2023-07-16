import supertest from 'supertest'
import app from '../src/app/app.js'
import { removeTestCustomer, createTestCustomer, createTestCustomerForLogin } from './testUtil.js'

describe('POST /api/v1/register', () => {
    afterAll( async () => {
        await removeTestCustomer()
    })
    beforeAll( async () => {
        await createTestCustomer()
    })
    it('should be able to register success', async () => {
        const result = await supertest(app)
            .post(`/api/v1/register`)
            .send({
                username: 'Ahmad Waldi Arridho',
                email: 'ahmad@gmail.com',
                phone: '+628343973984',
                password: 'ahmad123'
            })
        expect(result.status).toBe(201)
        expect(result.body.data.username).toBe('Ahmad Waldi Arridho')
        expect(result.body.data.email).toBe('ahmad@gmail.com')
        expect(result.body.data.phone).toBe('+628343973984')
    })
    it('should be able to validation errors', async () => {
        const result = await supertest(app)
            .post(`/api/v1/register`)
            .send({
                username: '',
                email: '',
                phone: '',
                password: ''
            })
        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()

    })
    it('should be able to duplicate username', async () => {
        const result = await supertest(app)
            .post(`/api/v1/register`)
            .send({
                username: 'ahmad',
                email: 'ahmad@gmail.com',
                phone: '+628343973984',
                password: 'ahmad123'
            })
        expect(result.status).toBe(400)
        expect(result.body.errors).toBe('Username already registered')

    })
    it('should be able to duplicate email', async () => {
        const result = await supertest(app)
            .post(`/api/v1/register`)
            .send({
                username: 'ahmad123',
                email: 'ahmad123@example.com',
                phone: '+628343973984',
                password: 'ahmad123'
            })
        expect(result.status).toBe(400)
        expect(result.body.errors).toBe('Email already registered')

    })
})

describe('POST /api/v1/login', () => {
    afterAll( async () => {
        await removeTestCustomer()
    })
    beforeAll( async () => {
        await createTestCustomerForLogin()
    })
    it('should be able to login success', async () => {
        const result = await supertest(app)
            .post('/api/v1/login')
            .send({
                email: 'ahmad123@example.com',
                password: 'ahmad111'
            })
        expect(result.status).toBe(200)
        expect(result.headers['set-cookie']).toBeDefined()

    })

    it('should validation error password and email', async () => {
        const result = await supertest(app)
            .post('/api/v1/login')
            .send({
                email: 'ahmadwaldi',
                password: ''
            })
        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()

    })

    it('should be wrong password and email', async () => {
        const result = await supertest(app)
            .post('/api/v1/login')
            .send({
                email: 'ahmadwaldi@gmail.com',
                password: 'ahmad1122'
            })
        expect(result.status).toBe(401)
        expect(result.body.errors).toBe('Email or password is wrong')

    })
})