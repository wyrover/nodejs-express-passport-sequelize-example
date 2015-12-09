'use strict';

module.exports = {
    database: {
        dialect: 'sqlite',
        storage: 'data/database_development.sqlite'
    },
    session: {
        secret: ['keyboard cat'],
    }
};
