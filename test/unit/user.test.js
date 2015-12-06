'use strict';

var expect = require('expect.js');

describe('models/user', function () {
    beforeEach(function () {
        this.User = require('../../models').User;

        var passportLocalSequelize = require('passport-local-sequelize');
        passportLocalSequelize.attachToUser(this.User);

        return this.User.destroy({ truncate: true, force: true });
    });

    describe('create', function () {
        it('creates a user', function (done) {
            return this.User.register(this.User.build({ username: 'johndoe' }), '123456', function (err, user) {
                if (err) {
                    done(err);
                    return;
                }
                expect(user.username).to.equal('johndoe');
                done();
            });
        });
    });
});
