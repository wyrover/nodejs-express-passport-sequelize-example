'use strict';

module.exports = {
    database: {
        dialect: 'sqlite',
        storage: ':memory:'
    },
    session: {
        secret: ['keyboard cat'],
        store: 'memory'
    }
};
