const dashboardRoute = require('express').Router();
const dashboardController = require('../controllers/dashboard.controller');

dashboardRoute.get('/', dashboardController.getDashboardPage);

module.exports = dashboardRoute;
