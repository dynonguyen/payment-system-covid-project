const authApi = require('express').Router();
const authController = require('../controllers/auth.controller');

authApi.post('/create-account', authController.postCreateAccount);

module.exports = authApi;
