'use strict';

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var redis = require('redis');
var connectRedis = require('connect-redis');
var env = process.env.NODE_ENV || 'development';
var express = require('express');
var path = require('path');

module.exports = function(app) {
    app.disable('x-powered-by');

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    var store;
    if ('memory' == app.locals.session.store) {
        store = new expressSession.MemoryStore();
    } else if ('redis' == app.locals.session.store) {
        var options = {};
        Object.keys(app.locals.session.storeConfig).forEach(function(key) {
            options[key] = app.locals.session.storeConfig[key];
        });
        options.client = redis.createClient();
        var RedisStore = connectRedis(expressSession);
        store = new RedisStore(options);
    } else {
        throw new Error('Session store ' + app.locals.session.store + ' not implemented');
    }
    app.locals.session.store = store;

    app.use(expressSession({
        name: app.locals.session.cookieName,
        secret: app.locals.session.secret,
        store: app.locals.session.store,
        resave: false,
        saveUninitialized: false
    }));

    // On production we should use nginx, as it is more specialized for serving static files than express.static
    if ('production' != env) {
        app.use(express.static(path.join(__dirname, '../../public')));
    }
};
