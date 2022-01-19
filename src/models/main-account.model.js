const { DataTypes, db } = require('../configs/db.config');

const MainAccount = db.define(
	'MainAccount',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		balance: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: 0,
		},
	},
	{ tableName: 'MainAccount', timestamps: false, initialAutoIncrement: 1000 }
);

module.exports = MainAccount;
