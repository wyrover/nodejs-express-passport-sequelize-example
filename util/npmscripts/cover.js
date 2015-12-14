'use strict';

var spawnCommand = require('./util.js').spawnCommand;

process.env.NODE_ENV = 'test';
spawnCommand('istanbul', [
    'cover',
    'node_modules/mocha/bin/_mocha', 'test/*/*.test.js', '--', '--reporter spec'
].concat(process.argv.slice(2)));
