'use strict';

var express = require('express');
var router = express.Router({
    caseSensitive: true,
    strict: true
});
var passport = require('passport');
var redirectAfterLogin = require('../../middleware/redirect-after-login');

router.get('/', function(req, res) {
    res.render('auth/login');
});
  
router.post('/', function(req, res, next) {
    passport.authenticate('local')(req, res, function(err) {
        if (err) {
            next(err);
            return;
        }
        if ( ! req.user) {
            res.render('auth/login', { errorMsg: 'Invalid username or password' });
            return;
        }
        redirectAfterLogin(req, res, next);
    });
});
  
module.exports = router;
