'use strict';

var expect = require('expect.js');

describe('config/index', function () {
    it('should have configs working', function () {
        var config = require('../../config');
        expect(config).to.be.an(Object);
    });
});