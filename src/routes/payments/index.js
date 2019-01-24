'use strict'

module.exports = ({ router, services, schemas }) => ({ controllers, passport, moment, joi }) => {

    router
        .route('/payments')
        .post([services.validations.verify({ services, moment, joi }, `payment`, `create`), controllers.payments.create({ services, schemas, moment })])

    return router
}