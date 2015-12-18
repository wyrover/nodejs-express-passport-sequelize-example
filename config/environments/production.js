'use strict';

module.exports = {
    database: {
        dialect: 'sqlite',
        storage: 'data/database.sqlite'
    },
    session: {
        secret: ['keyboard cat'],
        store: 'redis',
        storeConfig: {
            host: 'localhost',
            port: 6379
        }
    }
};
