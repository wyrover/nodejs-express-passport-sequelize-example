'use strict';

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var env = process.env.NODE_ENV || 'development';
var express = require('express');
var path = require('path');

module.exports = function(app) {
    app.disable('x-powered-by');

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(expressSession({
        name: app.locals.session.cookieName,
        secret: app.locals.session.secret,
        resave: false,
        saveUninitialized: false
    }));
    if ('development' == env) {
        app.use(express.static(path.join(__dirname, '../../public')));
    }
};
