'use strict';

module.exports = {
    database: {
        dialect: 'sqlite',
        storage: 'data/database.sqlite'
    },
    session: {
        secret: ['keyboard cat'],
    }
};
