const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Account = require('../models/account.model');
const bcrypt = require('bcryptjs');
const { MAX } = require('../constants');

passport.use(
	new LocalStrategy(async function (username, password, done) {
		try {
			// check if account existence
			const account = await Account.findOne({
				where: { username },
				raw: true,
			});

			// if not exist
			if (!account) {
				return done(null, false, {
					msg: 'Tài khoản không tồn tại !',
					username,
				});
			}

			const {
				password: accountPwd,
				failedLoginTime,
				isLocked,
				userId,
			} = account;

			// The account has been locked
			if (isLocked) {
				return done(null, false, {
					msg: 'Tài khoản đã bị khoá, vui lòng liên hệ người quản trị để mở khoá !',
					username,
				});
			}

			// check empty password -> if null -> create password
			if (!accountPwd) {
				return done(null, false, { isCreatePwd: true, username });
			}

			// else check password
			const isCorrectPwd = await bcrypt.compare(password, accountPwd);

			if (isCorrectPwd) {
				return done(null, { username, userId });
			}

			// if the password is incorrect
			let msg = '';
			if (failedLoginTime < MAX.FAILED_LOGIN_TIME - 1) {
				msg = 'Mật khẩu không chính xác';
				await Account.update(
					{ failedLoginTime: failedLoginTime + 1 },
					{ where: { username } }
				);
			} else {
				await Account.update(
					{ failedLoginTime: MAX.FAILED_LOGIN_TIME, isLocked: true },
					{ where: { username } }
				);
				msg = `Tài khoản của bạn đã bị khoá do đăng nhập sai quá ${MAX.FAILED_LOGIN_TIME} lần`;
			}

			return done(null, false, {
				msg,
				username,
			});
		} catch (error) {
			console.error('PASSPORT LOCAL STRATEGY ERROR: ', error);
			return done(error, false);
		}
	})
);

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(async function (user, done) {
	const { username } = user;
	try {
		const account = await Account.findOne({ where: { username } });
		if (account && !account.isLocked) {
			return done(null, user);
		}

		return done(null, false);
	} catch (error) {
		console.log('PASSPORT DESERIALIZE ERROR: ', error);
		done(error, false);
	}
});
