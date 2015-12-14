'use strict';

var spawnCommand = require('../util.js').spawnCommand;

process.env.DEBUG = '*';
spawnCommand('nodemon', [
    '--debug',
    '--ignore', 'test/',
    'bin/www'
].concat(process.argv.slice(2)));
