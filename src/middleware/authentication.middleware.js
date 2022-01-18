const { API_AUTH_HEADER, PRIVATE_KEY } = require('../constants');

exports.apiAuthentication = (req, res, next) => {
	const privateKey = req.headers[API_AUTH_HEADER];

	if (!privateKey || privateKey !== PRIVATE_KEY) {
		return res.status(403).json({ msg: 'Access denied !' });
	}
	return next();
};
