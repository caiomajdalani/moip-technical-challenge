'use strict'

module.exports = {
    http: function (method, url, headers = {}, body = {}, httpCode = 201, asserts = null, done) {
        request[method](url)
            .set(headers)
            .send(body)
            .expect(httpCode)
            .end((err, res) => {
                asserts
                addContext(this, {
                    title: 'Request Parameters',
                    value: {
                        URL: `http://localhost:5000/${url}`,
                        Headers: headers,
                        Body: body,
                        HttpCodeExpect: httpCode,
                        Expectations: asserts
                    }
                });
                done(err)
            })
    }
}




