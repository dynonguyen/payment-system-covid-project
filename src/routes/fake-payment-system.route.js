const fakePaymentSystemRoute = require('express').Router();
const fakePaymentSystemController = require('../controllers/fake-payment-system.controller');

fakePaymentSystemRoute.get(
	'/checkout',
	fakePaymentSystemController.getPaymentCheckout
);

module.exports = fakePaymentSystemRoute;
