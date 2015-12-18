'use strict';

var env = process.env.NODE_ENV || 'development';
var allConfig = require('./environments/all.js');
var environmentConfig = require('./environments/' + env + '.js');
var extendConfig = require('./util.js').extendConfig;

module.exports = extendConfig(allConfig, environmentConfig);
