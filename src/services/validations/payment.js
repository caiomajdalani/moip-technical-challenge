'use strict'

module.exports = {
    create: ({ joi }) => joi.object({
        body: joi.object({
            buyer: joi.object({
                name: joi.string().required(),
                email: joi.string().email().required(),
                cpf: joi.string().length(11).required(),
            }),
            date: joi.string().required(),
            payment: joi.object({
                amount: joi.number().integer().required(),
                type: joi.string().valid(`debit`, `credit`, `money`, `others`).required(),
                card: joi.object({
                    brand: joi.string().required(),
                    owner: joi.string().required(),
                    number: joi.string().length(16).regex(/\d{16}/).required(),
                    expiration: joi.string().required(),
                    bin: joi.string().length(3).regex(/\d{3}/).required()
                }).required()
            })
        })
    })
}