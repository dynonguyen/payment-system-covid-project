const Account = require('../models/account.model');
const { Op } = require('../configs/db.config');
const DebtHistory = require('../models/debt-history');
const PaymentLimit = require('../models/payment-limit.model');

exports.getDebtInfo = async (req, res) => {
	const userId = Number(req.params.userId);
	if (!userId || isNaN(userId)) {
		return res
			.status(400)
			.json({ debtInfo: null, msg: 'userId is required !' });
	}

	try {
		const debtInfo = await DebtHistory.findOne({
			raw: true,
			where: { userId },
			attributes: { exclude: ['accountId', 'userId', 'debtHistoryId'] },
		});
		return res.status(200).json({ debtInfo, msg: 'successfully' });
	} catch (error) {
		console.error('Function getDebtInfo Error: ', error);
		return res.status(500).json({ debtInfo: null, msg: error });
	}
};

exports.getPaymentLimit = async (req, res) => {
	try {
		const paymentLimit = await PaymentLimit.findOne({
			raw: true,
			attributes: { exclude: ['paymentLimitId'] },
		});
		return res.status(200).json({ paymentLimit });
	} catch (error) {
		console.error('Function getPaymentLimit Error: ', error);
		return res.status(500).json({ paymentLimit: null });
	}
};

exports.getUserBalance = async (req, res) => {
	const userId = Number(req.params.userId);

	try {
		const account = await Account.findOne({
			raw: true,
			where: { userId },
			attributes: ['balance'],
		});

		return res.status(200).json({ balance: account?.balance || 0 });
	} catch (error) {
		console.error('Function getUserBalance Error: ', error);
		return res.status(500).json({ balance: 0 });
	}
};

exports.postCreateAccount = async (req, res) => {
	const { username, userId } = req.body;

	try {
		if (!username || !userId) {
			throw 'username & userId is required !';
		}

		const isAccountExist = await Account.findOne({
			where: {
				[Op.or]: [{ username }, { userId }],
			},
		});
		if (isAccountExist) {
			throw 'Account already exists !';
		}

		const newAccount = await Account.create({
			username,
			userId,
			password: '',
			balance: 0,
		});

		if (!newAccount) {
			throw 'Account creation failed !';
		}

		return res.status(201).json({ msg: 'Successfully' });
	} catch (error) {
		console.error('Function postCreateAccount Error: ', error);
		return res.status(400).json({ msg: error });
	}
};
