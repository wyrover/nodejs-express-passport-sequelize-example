'use strict';

var path = require('path');

module.exports = function(app) {
    // view engine setup
    app.set('views', path.join(__dirname, '../../views'));
    app.set('view engine', 'jade');
};
