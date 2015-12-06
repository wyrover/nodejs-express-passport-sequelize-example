'use strict';

var express = require('express');
var router = express.Router({
    caseSensitive: true,
    strict: true
});

router.get('/', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
