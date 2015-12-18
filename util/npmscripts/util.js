'use strict';

var spawn = require('child_process').spawn;

function spawnCommand(command, args, opt) {
    var win32 = 'win32' == process.platform;
    var winCommand = win32 ? 'cmd' : command;
    var winArgs = win32 ? ['/c'].concat(command, args) : args;

    opt = opt || {};
    opt.stdio = 'inherit';
    var child = spawn(winCommand, winArgs, opt);
    child.on('error', function (err) {
        console.error(err);
    });
    child.on('close', function (code) {
        // 0 means success, do not bother user about success
        if (code) {
            console.log(command + ' exited with code ' + code);
        }
    });

    return child;
}

module.exports = {
    spawnCommand: spawnCommand
};
