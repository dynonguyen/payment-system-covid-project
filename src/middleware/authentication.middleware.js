const { CLIENT_AUTH_HEADER } = require('../constants');

exports.clientAuthentication = (req, res, next) => {
	const privateKey = req.headers[CLIENT_AUTH_HEADER];

	if (!privateKey || privateKey !== process.env.PRIVATE_KEY) {
		return res.status(403).json({ msg: 'Access denied !' });
	}
	return next();
};
