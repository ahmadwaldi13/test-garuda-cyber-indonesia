import prismaClient from '../database/db.js'
import ResponseError from '../error/ResponseError.js'
import { validate } from '../validation/validation.js'
import { registerValidationCustomer, loginValidationCustomer } from '../validation/customerValidation.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default class CustomerService {
    static register = async (request) => {
        const customer = validate(registerValidationCustomer, request)

        const { username, email, phone, password } = customer
        

        const checkDuplicteUsername = await prismaClient.customer.findUnique({
            where: {
                username: username,
            }
        })

        const checkDuplicteEmail = await prismaClient.customer.findUnique({
            where: {
                email: email,
            }
        })

        if(checkDuplicteUsername) {
            throw new ResponseError(400, 'Username already registered')
        }

        if(checkDuplicteEmail) {
            throw new ResponseError(400, 'Email already registered')
        }

        const hashPassword = await bcrypt.hash(password, 10)
    
        return await prismaClient.customer.create({
            data: {
                username,
                email,
                phone,
                password: hashPassword, 
            },
            select: {
                username: true,
                email: true,
                phone: true
            }
        })
    }

    static login = async (request) => {
        const loginRequest = await validate(loginValidationCustomer, request)

        const customer = await prismaClient.customer.findUnique({
            where: {
                email: loginRequest.email
            },
            select: {
                id: true,
                email: true,
                password: true,
                username: true
            }
        })
        if(!customer) {
            throw new ResponseError(401, 'Email or password is wrong')
        }
        const comparePassword = await bcrypt.compare(loginRequest.password, customer.password)
        if(!comparePassword) {
            throw new ResponseError(401, 'Email or password is wrong')
        }
        const token = await jwt.sign({ 
            id: customer.id, 
            email: customer.email, 
            username: customer.username, 
        },  
        process.env.ACCESS_TOKEN, 
        { 
            expiresIn: '24h' 
        })
        return {
            token, customerId: customer.id
        }
    }
}