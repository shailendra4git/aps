const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const helmet = require('helmet')
const logger = require('morgan');

const app = express();

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
const authRouter = require('./routes/auth');
const hostRouter = require('./routes/host');

// Api endpoints
app.use('/api/login', authRouter);
app.use('/api/host', hostRouter);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname+'/../client/build')));

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
	res.sendFile(path.join(__dirname+'/../client/build/index.html'));
});

module.exports = app;