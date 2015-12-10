'use strict';

module.exports = {
    app: {
        name: 'MyApp'
    },
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
