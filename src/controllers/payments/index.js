'use strict'

module.exports = {

    /**
     * @typedef createPayment
     * @property {buyer.model} buyer.required
     * @property {string} date.required
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
     * @property {string} amount.required - Amount paid (On cents. Ex.: R$22,50 = 2250)
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

        } catch (error) {

        }
    },
}