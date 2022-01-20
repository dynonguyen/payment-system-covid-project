require('dotenv').config();

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const { db } = require('./src/configs/db.config');
const path = require('path');
const { MAX } = require('./src/constants');
const session = require('express-session');
const passport = require('passport');
const fs = require('fs');
const https = require('https');
const MainAccount = require('./src/models/main-account.model');

/* ============== Import apis, middleware =============== */
const {
	apiAuthentication,
} = require('./src/middleware/authentication.middleware');
const {
	unlessRoute,
	authMiddleware,
} = require('./src/middleware/auth.middleware');
const apiRoute = require('./src/routes/api.route');
const authRoute = require('./src/routes/auth.route');
const dashboardRoute = require('./src/routes/dashboard.route');
const paymentHistoryRoute = require('./src/routes/payment-history.route');
const changePasswordRoute = require('./src/routes/change-password.route');
const putMoneyRoute = require('./src/routes/put-money.route');
const fakePaymentSystemRoute = require('./src/routes/fake-payment-system.route');
const PaymentLimit = require('./src/models/payment-limit.model');

/* ============== Config =============== */
app.use(express.static(path.join(__dirname, 'src/public')));
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SIGNED_COOKIE || 'signed_cookie'));
app.use(
	session({
		secret: process.env.SESSION_SECRET || 'session_secret',
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: MAX.SESSION_EXP,
		},
	})
);
app.use(passport.initialize());
app.use(passport.session());

// set view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src/views'));

// Config https for development environment & wake up heroku for production
let server = app;
if (process.env.NODE_ENV?.trim() === 'development') {
	// set logging
	app.use(morgan('tiny'));

	const key = fs.readFileSync(path.join(__dirname, '/key/key.pem'));
	const cert = fs.readFileSync(path.join(__dirname, '/key/cert.pem'));
	const options = {
		key: key,
		cert: cert,
	};
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
	server = https.createServer(options, app);
} else {
	app.disable('x-powered-by');
	app.use(morgan('common'));

	// Auto wake up heroku
	app.get('/wakeup-heroku', (req, res) => res.send(''));
	const timer = 25 * 60 * 1000; // 25 minutes
	setInterval(() => {
		https.get('https://cp-payment.herokuapp.com/wakeup-heroku');
	}, timer);
}

/* ============== Apis =============== */
app.use(unlessRoute(['/auth', '/api', '/wakeup-heroku'], authMiddleware));

app.use('/api', apiAuthentication, apiRoute);
app.use('/auth', authRoute);
app.use('/dashboard', dashboardRoute);
app.use('/payment-history', paymentHistoryRoute);
app.use('/change-password', changePasswordRoute);
app.use('/put-money', putMoneyRoute);
app.use('/xyz-fake-payment-system', fakePaymentSystemRoute);
app.use('/', (req, res) => res.redirect('/dashboard'));

app.use((req, res) => res.render('404.pug'));

/* ============== Listening =============== */
const normalizePort = (port) => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 3001);

db.sync({ after: true }).then((_) => {
	server.listen(PORT, () => {
		// Create a main account, payment limit if not exists
		MainAccount.count({}).then((count) => {
			if (count === 0) {
				MainAccount.create({});
			}
		});
		PaymentLimit.count({}).then((count) => {
			if (!count) {
				PaymentLimit.create({
					minimumLimit: 5,
					maximumDebt: 10_000_000,
				});
			}
		});
		console.log(`Server is listening on port ${PORT}`);
	});
});
