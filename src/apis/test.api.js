const testApi = require('express').Router();
const Account = require('../models/account.model');
const MainAccount = require('../models/main-account.model');
const PaymentHistory = require('../models/payment-history.model');

testApi.get('/test', (req, res) => res.send('Hello'));

module.exports = testApi;
