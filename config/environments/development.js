'use strict';

module.exports = {
    database: require('../config.json').development,
    session: {
        secret: ['keyboard cat'],
    }
};
