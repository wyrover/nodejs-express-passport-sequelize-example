'use strict';

var Umzug = require('umzug');
var Bluebird  = require('bluebird');

function applyMigrations(db) {
    var Sequelize = db.Sequelize;
    var sequelize = db.sequelize;
    var migrator = new Umzug({
        storage: 'sequelize',
        storageOptions: {
            sequelize: sequelize,
            tableName: 'migrations'
        },
        logging: console.log,
        migrations: {
            params: [ sequelize.getQueryInterface(), Sequelize ],
            path: process.cwd() + '/migrations',
            pattern: /^\d+[\w-]+\.js$/,
            wrap: function (fun) {
                if (fun.length === 3) {
                    return Bluebird.promisify(fun);
                } else {
                    return fun;
                }
            }
        }
    });

    return sequelize.authenticate().then(function () {
        return migrator.up();
    });
}

module.exports = {
    applyMigrations: applyMigrations
};