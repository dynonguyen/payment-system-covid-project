const { DataTypes, db } = require('../configs/db.config');

const PaymentLimit = db.define(
	'PaymentLimit',
	{
		paymentLimitId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		// Minimum payment limit in %, ex: 5% -> minimumLimit = 5
		minimumLimit: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 5,
		},
		maximumDebt: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 1_000_000,
		},
	},
	{ tableName: 'PaymentLimit', timestamps: false, initialAutoIncrement: 1 }
);

module.exports = PaymentLimit;
