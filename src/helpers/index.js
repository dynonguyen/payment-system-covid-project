const bcrypt = require('bcryptjs');

// Hash password with bcrypt
exports.hashPassword = (password = '') => {
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(Number(process.env.BCRYPT_SALT) || 10, function (err, salt) {
			if (err) reject(err);

			bcrypt.hash(password, salt, function (hashErr, hash) {
				if (hashErr) reject(hashErr);
				resolve(hash);
			});
		});
	});
};
