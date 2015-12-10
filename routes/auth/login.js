'use strict';

var express = require('express');
var router = express.Router({
    caseSensitive: true,
    strict: true
});
var passport = require('passport');
var redirectAfterLogin = require('../../middleware/redirect-after-login');

router.get('/', function(req, res/*, next */) {
    res.render('auth/login');
});
  
router.post('/', function(req, res, next) {
    passport.authenticate('local', {
        failWithError: true
    })(req, res, function(err) {
        if (err) {
            if ('AuthenticationError' == err.name) {
                res.status(400);
                res.render('auth/login', { errorMsg: 'Invalid username or password' });
                return;
            }
            next(err);
            return;
        }
        redirectAfterLogin(req, res, next);
    });
});
  
module.exports = router;
