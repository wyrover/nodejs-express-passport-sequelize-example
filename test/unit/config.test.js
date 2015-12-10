'use strict';

var expect = require('expect.js');

describe('config/index', function () {
    it('has proper config', function () {
        var config = require('../../config');
        expect(config).to.be.an(Object);
        expect(config.app).to.be.an(Object);
        expect(config.app.name).to.be.a('string');
        expect(config.database).to.be.an(Object);
        expect(config.database.dialect).to.be.a('string');
        expect(config.session).to.be.an(Object);
        expect(config.session.cookieName).to.be.a('string');
        expect.Assertion.prototype.stringOrArrayOfStrings = function() {
            var ok;
            if (typeof this.obj == 'string') {
                ok = true;
            } else if (this.obj instanceof Array) {
                ok = true;
                for(var i = 0; i < this.obj.length; ++i) {
                    if (typeof this.obj[i] != 'string') {
                        ok = false;
                        break;
                    }
                }
            } else {
                ok = false;
            }
            this.assert(ok, function() {
                return 'expected ' + expect.stringify(this.obj) + ' to be a string or an array of strings';
            }, function() {
                return 'expected ' + expect.stringify(this.obj) + ' to not be a string or an array of strings';
            });
        };
        expect(config.session.secret).to.be.stringOrArrayOfStrings();
        expect(config.paths).to.be.an(Object);
    });
});