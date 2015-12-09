'use strict';

module.exports = {
    database: {
        dialect: 'sqlite',
        storage: 'data/database_production.sqlite'
    },
    session: {
        secret: ['keyboard cat'],
    }
};
