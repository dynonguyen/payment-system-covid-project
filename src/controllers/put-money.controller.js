const BANK_LIST = require('../constants/bank-list');

exports.getPutMoneyPage = (req, res) => {
	return res.render('put-money.pug', {
		bankList: BANK_LIST,
	});
};
