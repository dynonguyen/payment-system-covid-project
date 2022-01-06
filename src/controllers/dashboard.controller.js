const { formatCurrency } = require('../helpers');
const Account = require('../models/account.model');

exports.getDashboardPage = async (req, res) => {
	const { accountId } = req.user;
	let { putMoneyStatus = null } = req.session;
	if (putMoneyStatus) {
		req.session.putMoneyStatus = null;
	}

	try {
		const account = await Account.findOne({
			raw: true,
			where: { accountId },
			attributes: ['balance'],
		});

		res.render('dashboard.pug', {
			balance: account?.balance || 0,
			msg: putMoneyStatus
				? putMoneyStatus == '1'
					? 'Nạp tiền thành công'
					: 'Nạp tiền thất bại'
				: null,
			isPutMoneySuccess: putMoneyStatus == '1' ? true : false,
			helpers: {
				formatCurrency,
			},
		});
	} catch (error) {
		console.log('getDashboardPage ERROR: ', error);
		return res.render('404.pug');
	}
};
