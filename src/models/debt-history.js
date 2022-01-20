const { DataTypes, db } = require('../configs/db.config');
const Account = require('./account.model');

const DebtHistory = db.define(
	'DebtHistory',
	{
		debtHistoryId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		debt: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		returned: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		status: {
			type: DataTypes.SMALLINT,
			allowNull: false,
			defaultValue: 0,
		},
		createdTime: {
			type: DataTypes.DATE,
			defaultValue: new Date(),
		},
		updatedTime: {
			type: DataTypes.DATE,
			defaultValue: new Date(),
		},
	},
	{ tableName: 'DebtHistory', timestamps: false, initialAutoIncrement: 1000 }
);

Account.hasOne(DebtHistory, {
	sourceKey: 'accountId',
	foreignKey: 'accountId',
	onUpdate: 'CASCADE',
	onDelete: 'CASCADE',
});

DebtHistory.belongsTo(Account, {
	foreignKey: 'accountId',
});

module.exports = DebtHistory;
