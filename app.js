'use strict';

var express = require('express');
var config = require('./config');

var app = express();

// Copy config to app.locals
for(var key in config) {
    app.locals[key] = config[key];
}

require('./config/initializers/views')(app);
require('./config/initializers/common')(app);
require('./config/initializers/auth')(app);
require('./config/initializers/routes')(app);

module.exports = app;
