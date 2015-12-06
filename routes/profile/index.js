'use strict';

var express = require('express');
var router = express.Router({
    caseSensitive: true,
    strict: true
});

router.get('/', function(req, res, next) {
    res.render('profile/index');
});

module.exports = router;
