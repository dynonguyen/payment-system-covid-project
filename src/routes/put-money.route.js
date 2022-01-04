const putMoneyRoute = require('express').Router();
const putMoneyController = require('../controllers/put-money.controller');

putMoneyRoute.get('/', putMoneyController.getPutMoneyPage);

module.exports = putMoneyRoute;
