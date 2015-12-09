'use strict';

//process.env.NODE_ENV = process.env.NODE_ENV || 'test';

var app      = require('../../app');
var config   = app.locals;
var expect   = require('expect.js');
var request  = require('supertest');
var testUtil = require('../util.js');

describe('authentication and authorization', function () {
    beforeEach(function () {
        var models = require('../../models');
        this.User = models.User;
        
        var passportLocalSequelize = require('passport-local-sequelize');
        passportLocalSequelize.attachToUser(this.User);

        return testUtil.applyMigrations(models);
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
        this.User.register(this.User.build({ username: username }), password, function (err, user) {
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
                    .end(function() {
                        this.User.destroy({ truncate: true, force: true }).then(function() {
                            done();
                        });
                    }.bind(this));
            }.bind(this));
        }.bind(this));
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
                .end(function() {
                    this.User.destroy({ truncate: true, force: true }).then(function() {
                        done();
                    });
                }.bind(this));
        }.bind(this));
    });
    
});
