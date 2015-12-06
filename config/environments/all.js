'use strict';

module.exports = {
    name: 'myapp',
    session: {
        cookieName: 'session'
    },
    paths: {
        loginPage: '/auth/login',
        registrationPage: '/auth/register',
        logout: '/auth/logout',
        redirectAfterLogin: '/profile',
    }
};
