'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface
            .createTable('Users', {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                username: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true
                },
                hash: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                salt: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                activationKey: {
                    type: Sequelize.STRING,
                    allowNull: true,
                    field: 'activation_key'
                },
                resetPasswordKey: {
                    type: Sequelize.STRING,
                    allowNull: true,
                    field: 'reset_password_key'
                },
                verified: {
                    type: Sequelize.BOOLEAN,
                    allowNull: true
                },
                createdAt: {
                    type: Sequelize.DATE,
                    field: 'created_at'
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    field: 'update_at'
                },
                deletedAt: {
                    type: Sequelize.DATE,
                    allowNull: true,
                    field: 'deleted_at'
                }
            });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface
            .dropTable('Users');
    }
};
