import joi from 'joi'

export const registerValidationCustomer = joi.object({
    username: joi.string().min(5).max(12).required(),
    email: joi.string().max(100).required().email(),
    phone: joi.string().max(100).required(),
    password: joi.string().max(100).min(8).required()
})

export const loginValidationCustomer = joi.object({
    email: joi.string().max(100).required().email(),
    password: joi.string().max(100).min(8).required()
})