'use strict';

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        hash: {
            type: DataTypes.STRING,
            allowNull: false
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false
        },
        activationKey: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'activation_key'
        },
        resetPasswordKey: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'reset_password_key'
        },
        verified: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'update_at'
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'deleted_at'
        }
    }, {
        timestamps: true,
        paranoid: true,
        classMethods: {
//            associate: function(models) {
//                User.hasManyThrough(models.Role, models.User_Role);
//            }
        }
    });

    return User;
};
