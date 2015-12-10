'use strict';

var expect = require('expect.js');
var testUtil = require('../util.js');

describe('models/user', function () {

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
