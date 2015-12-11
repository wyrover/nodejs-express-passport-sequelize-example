'use strict';

var spawnCommand = require('./util.js').spawnCommand;

process.env.NODE_ENV = 'test';
spawnCommand('mocha', [
    'test/*/*.test.js'
].concat(process.argv.slice(2)));
