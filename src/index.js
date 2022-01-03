require('dotenv').config();

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const { db } = require('./configs/db.config');

/* ============== Import apis, middleware =============== */
const {
	clientAuthentication,
} = require('./middleware/authentication.middleware');
const authApi = require('./apis/auth.api');

/* ============== Config =============== */
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SIGNED_COOKIE || 'signed_cookie'));

// set logging
app.use(morgan('tiny'));

/* ============== Apis =============== */
app.use(clientAuthentication);

app.use('/auth', authApi);

app.use((req, res) => res.status(404).json({ msg: 'Not Found' }));

/* ============== Listening =============== */
const normalizePort = (port) => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 3001);

db.sync({ after: true }).then((_) => {
	app.listen(PORT, () => {
		console.log(`Server is listening on port ${PORT}`);
	});
});
