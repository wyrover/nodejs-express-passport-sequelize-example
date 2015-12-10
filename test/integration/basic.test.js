'use strict';

var app      = require('../../app');
var request  = require('supertest-session');

describe('basic functions', function () {

    it('loads correctly', function (done) {
        request(app)
            .get('/')
            .expect(200)
            .expect('Content-Type', new RegExp('^text\/html'))
            .end(done);
    });

    it('handles wrong requests correctly', function (done) {
        request(app)
            .get('/asdfgh')
            .expect(404)
            .expect('Content-Type', new RegExp('^text\/html'))
            .end(done);
    });

});
