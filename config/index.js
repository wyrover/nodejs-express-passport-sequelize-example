'use strict';

var env = process.env.NODE_ENV || 'development';
var allConfig = require('./environments/all.js');
var environmentConfig = require('./environments/' + env + '.js');

var extend = (function() {
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    
    return function extend(target) {
        for (var i = 0; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (hasOwnProperty.call(source, key)) {
                    var value = source[key];
                    if (typeof value === 'object' && typeof target[key] === 'object') {
                        target[key] = extend(Object.create(null), target[key], value);
                    } else {
                        target[key] = value;
                    }
                }
            }
        }

        return target;
    };
})();

module.exports = extend(Object.create(null), allConfig, environmentConfig);
