'use strict';

module.exports = {
    name: 'myapp',
    database: {
        migrationStorageTableName: 'migrations'
    },
    session: {
        cookieName: 'session'
    },
    paths: {
        loginPage: '/auth/login',
        registrationPage: '/auth/register',
        logout: '/auth/logout',
        redirectAfterLogin: '/profile'
    }
};
