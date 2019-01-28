'use strict'

module.exports = {
    get: it(`Test`, function (done) {
        helpers.request.http('get', 'payments', {}, {}, 200, null, done)
    })
}