require('dotenv').config();

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const { db } = require('./configs/db.config');
const path = require('path');
const { MAX } = require('./constants');
const session = require('express-session');
const passport = require('passport');

/* ============== Import apis, middleware =============== */
const { apiAuthentication } = require('./middleware/authentication.middleware');
const { unlessRoute, authMiddleware } = require('./middleware/auth.middleware');
const apiRoute = require('./routes/api.route');
const authRoute = require('./routes/auth.route');
const dashboardRoute = require('./routes/dashboard.route');

/* ============== Config =============== */
app.use(express.static(path.join(__dirname, 'public')));
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
app.set('views', path.join(__dirname, 'views'));

// set logging
app.use(morgan('tiny'));

/* ============== Apis =============== */
app.use(unlessRoute(['/auth'], authMiddleware));

app.use('/api', apiAuthentication, apiRoute);
app.use('/auth', authRoute);
app.use('/dashboard', dashboardRoute);
app.use('/', (req, res) => res.redirect('/dashboard'));

app.use((req, res) => res.render('404.pug'));

/* ============== Listening =============== */
const normalizePort = (port) => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 3001);

db.sync({ after: true }).then((_) => {
	app.listen(PORT, () => {
		console.log(`Server is listening on port ${PORT}`);
	});
});
