const api = require('express').Router();
const apiController = require('../controllers/api.controller');

api.get('/debt-info/:userId', apiController.getDebtInfo);
api.get('/payment-limit', apiController.getPaymentLimit);
api.get('/balance/:userId', apiController.getUserBalance);

api.post('/create-account', apiController.postCreateAccount);

module.exports = api;
