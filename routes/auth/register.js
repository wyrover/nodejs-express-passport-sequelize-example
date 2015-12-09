'use strict';

var express = require('express');
var router = express.Router({
    caseSensitive: true,
    strict: true
});
var passport = require('passport');
var models = require('../../models');
var User = models.User;
var redirectAfterLogin = require('../../middleware/redirect-after-login');

router.get('/', function(req, res) {
    res.render('auth/register', {});
});

router.post('/', function(req, res, next) {
    //console.log('registering user');
    User.register(User.build({username: req.body.username}), req.body.password, function(err) {
        if (err) {
            //console.log('error while user register!', err);
            next(err);
            return;
        }

        //console.log('user registered!');
        
        passport.authenticate('local')(req, res, function (err) {
            if (err) {
                next(err);
                return;
            }
            redirectAfterLogin(req, res, next);
        });
    });
});

module.exports = router;
