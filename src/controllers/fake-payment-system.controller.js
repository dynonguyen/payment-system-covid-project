const jwt = require('jsonwebtoken');
const { formatCurrency } = require('../helpers');
const BANK_LIST = require('../constants/bank-list');

exports.getPaymentCheckout = (req, res) => {
	const { token } = req.query;

	try {
		const tokenData = jwt.verify(token, process.env.JWT_CHECKOUT_SECRET);
		const { totalMoney, bank } = tokenData.sub;
		const transactionCode = Date.now().toString();

		const { name: bankName, logoUrl: bankLogo } =
			BANK_LIST.find((b) => b.code === bank) || {};

		return res.render('fake-payment-checkout.pug', {
			transactionCode,
			totalMoney: formatCurrency(totalMoney),
			bankName: bankName,
			bankLogo,
			transactionFee: 'Miễn phí',
			transactionContent: 'Nạp tiền vào tài khoản',
			token,
		});
	} catch (error) {
		console.log('getPaymentCheckout ERROR: ', error);
	}
	return res.send(
		'<p style="text-align:center;color:#ee0000">Hệ thống thanh toán đã xảy ra lỗi. Thử lại sau</p>'
	);
};

exports.postPaymentCheckout = async (req, res) => {
	const { token, cardNumber, transactionCode } = req.body;
	try {
		if (!token || !cardNumber) {
			throw 'Failed';
		}

		const tokenData = jwt.verify(token, process.env.JWT_CHECKOUT_SECRET);
		const {
			totalMoney,
			bank,
			accountId,
			callback,
			successTokenKey,
			token: AToken,
		} = tokenData.sub;

		// payment processing .......

		// payment successfully
		const newToken = jwt.sign(
			{
				sub: {
					accountId,
					transactionCode,
					totalMoney,
					bank,
					cardNumber: cardNumber.slice(-4),
					token: AToken,
				},
				exp: Date.now() + 3000_000, // 30 mins
			},
			successTokenKey
		);

		return res.redirect(`${callback}?token=${newToken}`);
	} catch (error) {
		console.error('Function postPaymentCheckout Error: ', error);
		return res.redirect(`${callback}?token=failed`);
	}
};
