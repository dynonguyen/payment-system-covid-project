const { DataTypes, db } = require('../configs/db.config');

const Account = db.define(
	'Account',
	{
		accountId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING(30),
			unique: true,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING(72),
			allowNull: true,
		},
		balance: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: 0,
			validate: {
				min: 0,
			},
		},
	},
	{ tableName: 'Account', timestamps: false, initialAutoIncrement: 1 }
);

module.exports = Account;
