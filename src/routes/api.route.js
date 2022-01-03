const authApi = require('express').Router();
const apiController = require('../controllers/api.controller');

authApi.post('/create-account', apiController.postCreateAccount);

module.exports = authApi;
