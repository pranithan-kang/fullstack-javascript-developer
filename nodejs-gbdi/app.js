// https://kenichishibata.medium.com/3-ways-to-fix-relative-paths-in-nodejs-require-ffc7f89bd7e1
const appModulePath = require('app-module-path');
appModulePath.addPath(__dirname);

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// This causes the localhost:port/ directly point to public/index.html
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);

module.exports = app;
