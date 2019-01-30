'use strict'

const supertest = require("supertest")
    , expect = require("chai").expect
    , assert = require(`chai`).assert
    , addContext = require('mochawesome/addContext')
    , request = supertest("http://localhost:5000/")
    , faker = require('faker')

const reporter = function (test, method, url, headers = {}, body = {}, httpCode = 201, response) {
    return addContext(test, {
        title: 'Request Parameters',
        value: {
            URL: `http://localhost:5000/${url}`,
            Method: method,
            Headers: headers,
            Body: body,
            HttpCodeExpect: httpCode,
            Response: response
        }
    })
}

const http = function (method, url, headers = {}, body = {}, httpCode = 201) {
    return request[method](url)
        .set(headers)
        .send(body)
        .expect(httpCode)
}

const _mapBody = (type) => {
    return {
        buyer: {
            name: faker.name.findName(),
            email: faker.internet.email(),
            cpf: faker.helpers.replaceSymbolWithNumber("###########")
        },
        date: faker.date.recent(15),
        payment: {
            amount: faker.random.number({ min: 1000, max: 10000 }),
            type: type,
            card: type === 'credit' ? {
                brand: 'visa',
                owner: faker.name.findName(),
                number: faker.helpers.replaceSymbolWithNumber("################"),
                expiration: '01/2022',
                bin: faker.helpers.replaceSymbolWithNumber("###")
            } : null
        }
    }
}

describe('Test Mocha with Functional NodeJS', () => {
    it(`GET`, function (done) {
        var test = this
        http('get', 'payments', {}, {}, 200)
            .end((err, res) => {
                expect(res.body.message).to.equal(`OK`)
                reporter(test, 'get', 'payments', {}, {}, 200, (res ? res.body : err))
                done(err)
            })
    }),
        it(`POST - Boleto`, function (done) {
            var test = this
                , body = _mapBody('boleto')
            http('post', 'payments', {}, body, 201)
                .end((err, res) => {
                    // expect(res.body.message).to.equal(`OK`)
                    reporter(test, 'get', 'payments', {}, body, 201, (res ? res.body : err))
                    done(err)
                })
        }),
        it(`POST - Credit`, function (done) {
            var test = this
                , body = _mapBody('credit')
            http('post', 'payments', {}, body, 201)
                .end((err, res) => {
                    // expect(res.body.message).to.equal(`OK`)
                    reporter(test, 'get', 'payments', {}, body, 201, (res ? res.body : err))
                    done(err)
                })
        })
})