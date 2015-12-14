'use strict';

var express = require('express');
var path = require('path');
var connectEnsureLogin = require('connect-ensure-login');

module.exports = function(app) {
    app.use(express.static(path.join(__dirname, 'public')));

    var config = app.locals;
    var routesBasePath = '../../routes/';
    var ensureLoggedIn = connectEnsureLogin.ensureLoggedIn({
        redirectTo: config.paths.loginPage,
        setReturnTo: true,
    });
    var ensureLoggedOut = connectEnsureLogin.ensureLoggedOut({
        redirectTo: '/'
    });

    app.use('/', require(routesBasePath + 'index'));
    app.use('/profile', ensureLoggedIn, require(routesBasePath + 'profile/index'));
    app.use('/auth/login', ensureLoggedOut, require(routesBasePath + 'auth/login'));
    app.use('/auth/logout', ensureLoggedIn, require(routesBasePath + 'auth/logout'));
    app.use('/auth/register', ensureLoggedOut, require(routesBasePath + 'auth/register'));

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    /* istanbul ignore if */
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: {}
        });
    });
};
