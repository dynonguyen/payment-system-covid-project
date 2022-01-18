const Account = require('../models/account.model');
const { hashPassword } = require('../helpers');
const passport = require('passport');
const { TRACKING_QUERY_KEY } = require('../constants');
require('../middleware/passport.middleware');

exports.getLogin = (req, res) => {
	const token = req.query[TRACKING_QUERY_KEY];

	if (!token && req.isAuthenticated()) {
		return res.redirect('/');
	}

	return res.render('login.pug', { token, trackingKey: TRACKING_QUERY_KEY });
};

exports.getLogout = (req, res) => {
	req.logout();
	return res.redirect('/auth/login');
};

exports.postLogin = async (req, res, next) => {
	passport.authenticate('local', function (error, user, info) {
		const token = req.body[TRACKING_QUERY_KEY];

		if (error) {
			return res.render('login.pug', {
				msg: 'Đăng nhập thất bại, thử lại !',
				token,
				trackingKey: TRACKING_QUERY_KEY,
			});
		}

		if (!user) {
			const { isCreatePwd = false, msg, username } = info;
			if (isCreatePwd) {
				return res.render('create-password.pug', {
					username,
					token,
					trackingKey: TRACKING_QUERY_KEY,
				});
			}

			return res.render('login.pug', {
				msg,
				username,
				token,
				trackingKey: TRACKING_QUERY_KEY,
			});
		}

		req.login(user, function (err) {
			if (err) {
				return res.render('404.pug');
			}
			if (token) {
				return res.redirect(`/put-money?${TRACKING_QUERY_KEY}=${token}`);
			}
			return res.redirect('/');
		});
	})(req, res, next);
};

exports.postCreatePassword = async (req, res) => {
	const { username } = req.params;
	const { password, token } = req.body;

	try {
		if (username && password) {
			const hashPw = await hashPassword(password);
			await Account.update({ password: hashPw }, { where: { username } });
			if (token) {
				return res.redirect(`/auth/login?${TRACKING_QUERY_KEY}=${token}`);
			}
			return res.redirect('/auth/login');
		}
	} catch (error) {
		console.error('Function postCreatePassword Error: ', error);
		if (token) {
			return res.redirect(`/auth/login?${TRACKING_QUERY_KEY}=${token}`);
		}
		return res.redirect('/auth/login');
	}
};
