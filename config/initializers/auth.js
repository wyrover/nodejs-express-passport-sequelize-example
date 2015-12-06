'use strict';

var passport = require('passport');
var passportLocalStrategy = require('passport-local').Strategy;
var passportLocalSequelize = require('passport-local-sequelize');
var models = require('../../models');
var User = models.User;

module.exports = function(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passportLocalSequelize.attachToUser(User);

    // passport config
    passport.use(new passportLocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    
    // Ability to access `user` in views
    app.use(function(req, res, next) {
        res.locals.user = req.user;
        next();
    });
};
