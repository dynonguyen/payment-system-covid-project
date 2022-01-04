const { formatCurrency } = require('../helpers');
const Account = require('../models/account.model');

exports.getDashboardPage = async (req, res) => {
	const { accountId } = req.user;
	try {
		const account = await Account.findOne({
			raw: true,
			where: { accountId },
			attributes: ['balance'],
		});

		res.render('dashboard.pug', {
			balance: account?.balance || 0,
			helpers: {
				formatCurrency,
			},
		});
	} catch (error) {
		console.log('getDashboardPage ERROR: ', error);
		return res.render('404.pug');
	}
};
