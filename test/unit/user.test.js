'use strict';

var expect = require('expect.js');
var testUtil = require('../util.js');

describe('models/user', function () {
    beforeEach(function () {
        var models = require('../../models');
        this.User = models.User;

        var passportLocalSequelize = require('passport-local-sequelize');
        passportLocalSequelize.attachToUser(this.User);

        return testUtil.applyMigrations(models);
    });
    
    describe('create', function () {
        it('creates a user', function (done) {
            return this.User.register(this.User.build({ username: 'johndoe' }), '123456', function (err, user) {
                if (err) {
                    done(err);
                    return;
                }
                expect(user.username).to.equal('johndoe');
                this.User.destroy({ truncate: true, force: true }).then(function() {
                    done();
                });
            }.bind(this));
        });
    });
});
