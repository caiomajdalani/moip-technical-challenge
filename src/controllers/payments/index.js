'use strict'

const _validate = (services, schemas, moment) => async (body) => {
    const isCPF = await services.checkers.isCPF(body.buyer.cpf)
    if (!isCPF) {
        return { result: false, message: 'This CPF is not valid.' }
    }
    const isDate = await services.checkers.isValidDate(body.date)
    if (!isDate) {
        return { result: false, message: 'This Date is not valid.' }
    }
    return { result: true }
}

const _mapPayment = (services, schemas, moment) => (body, buyer) => {
    return {
        buyer: buyer._id,
        date: +moment(body.date),
        payment: {
            amount: body.payment.amount,
            type: body.payment.type,
            card: {
                brand: body.payment.card.brand,
                owner: body.payment.card.owner,
                number: body.payment.card.number,
                expiration: body.payment.card.expiration,
                bin: body.payment.card.bin
            }
        }
    }
}

module.exports = {

    /**
     * @typedef createPayment
     * @property {buyer.model} buyer.required
     * @property {string} date.required - Payment date
     * @property {payment.model} payment.required
     */

    /**
     * @typedef buyer
     * @property {string} name.required - Buyer name
     * @property {string} email.required - Buyer email
     * @property {string} cpf.required - Buyer CPF
     */

    /**
     * @typedef payment
     * @property {integer} amount.required - Amount paid on cents (Ex.: R$22,50 = 2250)
     * @property {string} type.required - Payment type ('money', 'debit', 'credit' or 'others')
     * @property {card.model} card - Payment card informations 
     */

    /**
     * @typedef card
     * @property {string} brand - Card brand
     * @property {string} owner - Name of the card owner
     * @property {string} number - Card number
     * @property {string} expiration - Card expiration date (Ex.: 12/2028)
     * @property {string} bin - Card bin
     */

    /**
     * Create a Payment
     * @route POST /payments
     * @group PAYMENTS - Resource for payments operations.
     * @param {createPayment.model} createPayment.body.required - Create Payment payload.
     * @returns {object} 201 - Payment object with it properties.
     * @returns {Error} 400 - Any property is invalid.
     * @returns {Error} 422 - UnprocessableEntity
     * @returns {Error} 500 - Internal server error.
     */
    create: ({ services, schemas, moment }) => async (request, response) => {
        try {
            const res = await _validate(services, schemas, moment)(request.body)
            if (!res.result) {
                return services.replies.conflict(response)(res.message)
            }
            const { data: dataFindBuyer, error: errorFindBuyer } = await services.repositories.findOne(schemas.buyer, { "cpf": request.body.buyer.cpf })

            const buyer = dataFindBuyer ? dataFindBuyer : await services.repositories.save(schemas.buyer, request.body.buyer)

            const _mappedPayment = await _mapPayment(services, schemas, moment)(request.body, buyer.data)

            const { data: dataCreatePayment, error: errorCreatePayment } = await services.repositories.save(schemas.payment, _mappedPayment)
            if (dataCreatePayment) {
                const { data: dataFindPayment, error: errorFindPayment } = await services.repositories.findOne(schemas.payment, { _id: dataCreatePayment._id }, 'buyer')
                return services.replies.created(response)(dataFindPayment)
            } else {
                return services.replies.unprocessableEntity(response)(errorCreatePayment)
            }
        } catch (error) {
            console.log(`error => `, error)
            return services.replies.internalServerError(response)(`Error.`)
        }
    },
}