'use strict'

module.exports = ({ router, services, schemas }) => ({ controllers, passport, moment, joi }) => {

    router
        .route('/v1/payments')
        // .post([services.validation.verify({ services, moment, joi }, `cashier`, `open`), controllers[`v1.0`].cashiers.open({ services, schemas, moment, joi })])
        .post([controllers.payments.create({ services, schemas, moment, joi })])

    return router
}