const Account = require('../models/account.model');
const { hashPassword } = require('../helpers');
const passport = require('passport');
require('../middleware/passport.middleware');

exports.getLogin = (req, res) => {
	if (req.isAuthenticated()) {
		return res.redirect('/');
	}
	return res.render('login.pug');
};

exports.getLogout = (req, res) => {
	req.logout();
	return res.redirect('/auth/login');
};

exports.postLogin = async (req, res, next) => {
	passport.authenticate('local', function (error, user, info) {
		if (error) {
			return res.render('login.pug', {
				msg: 'Đăng nhập thất bại, thử lại !',
			});
		}

		if (!user) {
			const { isCreatePwd = false, msg, username } = info;
			if (isCreatePwd) {
				return res.render('create-password.pug', {
					username,
				});
			}

			return res.render('login.pug', {
				msg,
				username,
			});
		}

		req.login(user, function (err) {
			if (err) {
				return res.render('404.pug');
			}
			return res.redirect('/');
		});
	})(req, res, next);
};

exports.postCreatePassword = async (req, res) => {
	const { username } = req.params;
	const { password } = req.body;
	try {
		if (username && password) {
			const hashPw = await hashPassword(password);
			await Account.update({ password: hashPw }, { where: { username } });
			return res.redirect('/auth/login');
		}
	} catch (error) {
		console.error('Function postCreatePassword Error: ', error);
		return res.render('/auth/login');
	}
};
