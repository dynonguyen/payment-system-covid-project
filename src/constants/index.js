module.exports = {
	API_AUTH_HEADER: 'covid-token',
	MAX: {
		SESSION_EXP: 300 * 60 * 1000, // 30 mins
		FAILED_LOGIN_TIME: 5,
		CHECKOUT_JWT_EXP: 20 * 60 * 1000, //20 mins
	},
};
