const changePasswordRoute = require('express').Router();
const changePasswordController = require('../controllers/change-password.controller');

changePasswordRoute.get('/', changePasswordController.getChangePassword);
changePasswordRoute.post('/', changePasswordController.postChangePassword);

module.exports = changePasswordRoute;
