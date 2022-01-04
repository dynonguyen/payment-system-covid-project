const BANK_LIST = require('../constants/bank-list');
const jwt = require('jsonwebtoken');
const { MAX } = require('../constants');

exports.getPutMoneyPage = (req, res) => {
	return res.render('put-money.pug', {
		bankList: BANK_LIST,
	});
};

exports.postCheckoutPutMoney = (req, res) => {
	const { totalMoney, bank } = req.body;
	const { accountId } = req.user;
	const rootUrl = `${req.protocol}://${req.get('host')}`;

	const token = jwt.sign(
		{
			issuer: 'PayCP',
			iat: Date.now(),
			exp: Date.now() + MAX.CHECKOUT_JWT_EXP,
			sub: {
				accountId,
				totalMoney,
				bank,
				callback: `${rootUrl}/dashboard`,
			},
		},
		process.env.JWT_CHECKOUT_SECRET
	);

	const fakePaymentSystemUrl = `${rootUrl}/xyz-fake-payment-system/checkout?token=${token}`;

	return res.status(200).json({
		url: fakePaymentSystemUrl,
	});
};
