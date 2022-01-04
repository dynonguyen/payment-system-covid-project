const paymentHistoryRoute = require('express').Router();
const paymentHistoryController = require('../controllers/payment-history.controller');

paymentHistoryRoute.get('/', paymentHistoryController.getPaymentHistory);

module.exports = paymentHistoryRoute;
