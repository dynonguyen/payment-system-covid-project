const Sequelize = require('sequelize').Sequelize;
const { Op, DataTypes } = require('sequelize');

const { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

const db = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
	host: DB_HOST || 'localhost',
	dialect: 'postgres',
	logging: false,
});

module.exports = {
	db,
	Op,
	DataTypes,
};
