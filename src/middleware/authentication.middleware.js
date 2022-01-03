const { API_AUTH_HEADER } = require('../constants');

exports.apiAuthentication = (req, res, next) => {
	const privateKey = req.headers[API_AUTH_HEADER];

	if (!privateKey || privateKey !== process.env.PRIVATE_KEY) {
		return res.status(403).json({ msg: 'Access denied !' });
	}
	return next();
};
