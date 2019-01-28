'use strict'

const helpers = require('./helpers/index')
    , specs = require('./specs/index')

const supertest = require("supertest")
const chai = require("chai")
const addContext = require('mochawesome/addContext')

global.request = supertest("http://localhost:5000/")
global.addContext = addContext
global.expect = chai.expect
global.assert = chai.assert

describe('Test Mocha with Functional NodeJS', () => {
    specs.payments.get()
})