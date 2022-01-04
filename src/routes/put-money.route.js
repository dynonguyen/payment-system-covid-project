const putMoneyRoute = require('express').Router();
const putMoneyController = require('../controllers/put-money.controller');

putMoneyRoute.get('/', putMoneyController.getPutMoneyPage);
putMoneyRoute.post('/checkout', putMoneyController.postCheckoutPutMoney);

module.exports = putMoneyRoute;
