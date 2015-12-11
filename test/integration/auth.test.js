'use strict';

//process.env.NODE_ENV = process.env.NODE_ENV || 'test';

var app      = require('../../app');
var config   = app.locals;
var expect   = require('expect.js');
var request  = require('supertest-session');
var testUtil = require('../util.js');

describe('authentication', function () {

    before('apply migrations', function() {
        var models = require('../../models');
        return testUtil.getMigrator(models).then(function(migrator) {
            return migrator.up();
        });
    });

    after('undo migrations', function() {
        var models = require('../../models');
        return testUtil.getMigrator(models).then(function(migrator) {
            return migrator.down();
        });
    });
    
    beforeEach(function () {
        var models = require('../../models');
        this.User = models.User;
        
        var passportLocalSequelize = require('passport-local-sequelize');
        passportLocalSequelize.attachToUser(this.User);
    });

    it('shows a login page', function (done) {
        request(app)
            .get(config.paths.loginPage)
            .expect(200)
            .expect('Content-Type', new RegExp('^text\/html'))
            .end(done);
    });

    it('authenticates a user', function (done) {
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
                    .end(function(err/*, res */) {
                        if (err) {
                            done(err);
                            return;
                        }
                        this.User.findOne({ where: { username: username } }).then(function(user) {
                            user.destroy({ force: true }).then(function() {
                                done();
                            });
                        });
                    }.bind(this));
            }.bind(this));
        }.bind(this));
    });

    it('after authentication it redirects back to page where user intended to go', function (done) {
        var username = 'johndoe';
        var password = '123456';
        this.User.register(this.User.build({ username: username }), password, function (err, user) {
            if (err) {
                done(err);
                return;
            }
            var intendedPage = '/profile';
            var agent = request(app);
            agent
                .get(intendedPage)
                .expect(302)
                .expect('Location', config.paths.loginPage)
                .end(function(err, res) {
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
                        .expect('Location', intendedPage)
                        .end(function(err/*, res */) {
                            if (err) {
                                done(err);
                                return;
                            }
                            this.User.findOne({ where: { username: username } }).then(function(user) {
                                user.destroy({ force: true }).then(function() {
                                    done();
                                });
                            });
                        }.bind(this));
                }.bind(this));
        }.bind(this));
    });

    it('shows error on bad username', function (done) {
        var agent = request(app);
        agent
            .post(config.paths.loginPage)
            .type('form')
            .send({
                username: 'janedoe',
                password: 'abcdef'
            })
            .expect(400)
            .expect(new RegExp('Invalid username or password'))
            .end(function(err/*, res */) {
                if (err) {
                    done(err);
                    return;
                }
                done();
            });
    });

    it('shows error on bad password', function (done) {
        var username = 'johndoe';
        var password = '123456';
        this.User.register(this.User.build({ username: username }), password, function (err, user) {
            if (err) {
                done(err);
                return;
            }
            var agent = request(app);
            agent
                .post(config.paths.loginPage)
                .type('form')
                .send({
                    username: username,
                    password: 'abcdef'
                })
                .expect(400)
                .expect('Content-Type', new RegExp('^text\/html'))
                .expect(new RegExp('Invalid username or password'))
                .end(function(err/*, res */) {
                    if (err) {
                        done(err);
                        return;
                    }
                    this.User.findOne({ where: { username: username } }).then(function(user) {
                        user.destroy({ force: true }).then(function() {
                            done();
                        });
                    });
                }.bind(this));
        }.bind(this));
    });

    it('logouts a user', function (done) {
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
                    .end(function(err, res) {
                        if (err) {
                            done(err);
                            return;
                        }
                        
                        agent
                            .get(config.paths.logout)
                            .expect(302)
                            .expect('Location', '/')
                            .end(function(err/*, res */) {
                                if (err) {
                                    done(err);
                                    return;
                                }
                                
                                this.User.findOne({ where: { username: username } }).then(function(user) {
                                    user.destroy({ force: true }).then(function() {
                                        done();
                                    });
                                });
                            }.bind(this));
                    }.bind(this));
            }.bind(this));
        }.bind(this));
    });

    it('registers a user', function (done) {
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
                .end(function(err/*, res */) {
                    if (err) {
                        done(err);
                        return;
                    }
                    this.User.findOne({ where: { username: username } }).then(function(user) {
                        user.destroy({ force: true }).then(function() {
                            done();
                        });
                    });
                }.bind(this));
        }.bind(this));
    });

    it('shows errors on issues', function (done) {
        var models = require('../../models');
        testUtil.getMigrator(models).then(function(migrator) {
            migrator.down().then(function() {
                var agent = request(app);
                agent
                    .post(config.paths.loginPage)
                    .type('form')
                    .send({
                        username: 'janedoe',
                        password: 'abcdef'
                    })
                    .expect(500)
                    .expect('Content-Type', new RegExp('^text\/html'))
                    .expect(new RegExp('Error', 'i'))
                    .end(function(err/*, res */) {
                        if (err) {
                            done(err);
                            return;
                        }
                        agent
                            .post(config.paths.registrationPage)
                            .type('form')
                            .send({
                                username: 'janedoe',
                                password: 'abcdef'
                            })
                            .expect(500)
                            .expect('Content-Type', new RegExp('^text\/html'))
                            .expect(new RegExp('Error', 'i'))
                            .end(function(err/*, res */) {
                                if (err) {
                                    done(err);
                                    return;
                                }
                                migrator.up().then(function() {
                                    done();
                                });
                            });
                    });
            });
        });
    });
                                
    it('shows errors if a user already registered', function (done) {
        var username = 'johndoe';
        var password = '123456';
        var agent = request(app);
        agent
            .post(config.paths.registrationPage)
            .type('form')
            .send({
                username: username,
                password: password
            })
            .expect(302)
            .end(function(err/*, res */) {
                if (err) {
                    done(err);
                    return;
                }
                agent.destroy();
                agent
                    .post(config.paths.registrationPage)
                    .type('form')
                    .send({
                        username: username,
                        password: password
                    })
                    .expect(400)
                    .expect('Content-Type', new RegExp('^text\/html'))
                    .end(function(err/*, res */) {
                        if (err) {
                            done(err);
                            return;
                        }
                        this.User.findOne({ where: { username: username } }).then(function(user) {
                            user.destroy({ force: true }).then(function() {
                                done();
                            });
                        });
                    }.bind(this));
            }.bind(this));
    });
    
    // TODO: move this test to authenticated.test.js
    it('shows profile page', function (done) {
        var username = 'johndoe';
        var password = '123456';
        this.User.register(this.User.build({ username: username }), password, function (err, user) {
            var agent = request(app);
            agent
                .post(config.paths.loginPage)
                .type('form')
                .send({
                    username: username,
                    password: password
                })
                .expect(302)
                .expect('Location', config.paths.redirectAfterLogin)
                .end(function(err, res) {
                    if (err) {
                        done(err);
                        return;
                    }
                    
                    agent
                        .get('/profile')
                        .expect(200)
                        .expect('Content-Type', new RegExp('^text\/html'))
                        .end(function(err/*, res */) {
                            if (err) {
                                done(err);
                                return;
                            }
                            this.User.findOne({ where: { username: username } }).then(function(user) {
                                user.destroy({ force: true }).then(function() {
                                    done();
                                });
                            });
                        }.bind(this));
                }.bind(this));
        }.bind(this));
    });
    
});
