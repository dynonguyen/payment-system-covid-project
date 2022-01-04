const bcrypt = require('bcryptjs');
const { hashPassword } = require('../helpers');
const Account = require('../models/account.model');

exports.getChangePassword = (req, res) => {
	return res.render('change-password.pug');
};

exports.postChangePassword = async (req, res) => {
	const { oldPassword, newPassword } = req.body;
	const { accountId } = req.user;

	try {
		const account = await Account.findByPk(accountId, {
			raw: true,
			attributes: ['password'],
		});

		if (!account) {
			throw new Error('account does not exists');
		}

		const isCorrectPwd = await bcrypt.compare(oldPassword, account.password);
		if (!isCorrectPwd) {
			return res.render('change-password', {
				msg: 'Mật khẩu hiện tại không chính xác',
			});
		}

		const newHashPwd = await hashPassword(newPassword);
		const affectedRows = await Account.update(
			{ password: newHashPwd },
			{ where: { accountId } }
		);

		if (affectedRows) {
			req.logout();
			res.redirect('/auth/login');
		}
	} catch (error) {
		console.error('Function putChangePassword Error: ', error);
		return res.render('change-password', {
			msg: 'Cập nhật thất bại, thử lại',
		});
	}
};
