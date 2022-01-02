const { DataTypes, db } = require('../configs/db.config');
const Account = require('./account.model');

const PaymentHistory = db.define(
	'PaymentHistory',
	{
		paymentId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		transactionCode: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		beforeBalance: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: 0,
			validate: {
				min: 0,
			},
		},
		afterBalance: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: 0,
			validate: {
				min: 0,
			},
		},
		totalMoney: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: 0,
			validate: {
				min: 0,
			},
		},
		createdDate: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: new Date(),
		},
	},
	{ tableName: 'PaymentHistory', timestamps: false, initialAutoIncrement: 1 }
);

Account.hasMany(PaymentHistory, {
	sourceKey: 'accountId',
	foreignKey: {
		name: 'accountId',
		allowNull: false,
	},
	onDelete: 'RESTRICT',
	onUpdate: 'CASCADE',
});

PaymentHistory.belongsTo(Account, {
	foreignKey: 'accountId',
});

module.exports = PaymentHistory;
