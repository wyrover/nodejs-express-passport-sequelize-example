'use strict';

var app      = require('../../app');
var config   = app.locals;
var Promise  = require('lie');
var expect   = require('expect.js');
var request  = require('supertest');

describe('authentication and authorization', function () {
    beforeEach(function () {
        this.models = require('../../models');
        var passportLocalSequelize = require('passport-local-sequelize');
        passportLocalSequelize.attachToUser(this.models.User);

        return Promise.all([
//            this.models.Task.destroy({ truncate: true }),
            this.models.User.destroy({ truncate: true, force: true })
        ]);
    });

    it('loads correctly', function (done) {
        request(app).get('/').expect(200, done);
    });

    it('shows a login page', function (done) {
        request(app).get(config.paths.loginPage).expect(200, done);
    });

    it('login works', function (done) {
        var username = 'johndoe';
        var password = '123456';
        this.models.User.register(this.models.User.build({ username: username }), password, function (err, user) {
            if (err) {
                done(err);
                return;
            }
            var agent = request(app);
            agent.get(config.paths.loginPage).expect(200).end(function(err, res) {
                if (err) {
                    done(err);
                    return;
                }
                agent
                    .post(config.paths.loginPage)
                    .type('form')
                    .send({
                        username: username,
                        password: password
                    })
                    .expect(302)
                    .expect('Location', config.paths.redirectAfterLogin)
                    .end(done);
            });
        });
    });
    
    it('registration works', function (done) {
        var username = 'johndoe';
        var password = '123456';
        var agent = request(app);
        agent.get(config.paths.registrationPage).expect(200).end(function(err, res) {
            if (err) {
                done(err);
                return;
            }
            agent
                .post(config.paths.registrationPage)
                .type('form')
                .send({
                    username: username,
                    password: password
                })
                .expect(302)
                .expect('Location', config.paths.redirectAfterLogin)
                .end(done);
        });
    });
    
});
