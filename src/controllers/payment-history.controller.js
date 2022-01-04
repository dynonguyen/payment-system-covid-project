const { formatDateToStr, formatCurrency } = require('../helpers');
const PaymentHistory = require('../models/payment-history.model');

exports.getPaymentHistory = async (req, res) => {
	const { accountId } = req.user;
	try {
		const paymentHistories = await PaymentHistory.findAll({
			raw: true,
			where: { accountId },
			attributes: {
				exclude: ['paymentId', 'accountId', 'beforeBalance'],
			},
		});

		return res.render('payment-history.pug', {
			paymentHistories,
			helpers: {
				formatDate: formatDateToStr,
				formatCurrency,
			},
		});
	} catch (error) {
		console.error('Function getPaymentHistory Error: ', error);
		return res.render('404');
	}
};
