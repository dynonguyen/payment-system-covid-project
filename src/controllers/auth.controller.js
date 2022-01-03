const Account = require('../models/account.model');
const { Op } = require('../configs/db.config');

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
