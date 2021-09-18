module.exports = function (sequelize, dataTypes) {
    return sequelize.define('user', {
        id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        nonce: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            unique: true,
        },
        publicAddress: {
            type: dataTypes.STRING(32),
            allowNull: false,
            unique: true,
        },
        username: {
            type: dataTypes.STRING(64),
            allowNull: true,
            unique: true,
        },
        phone: {
            type: dataTypes.STRING(16),
            allowNull: true,
            unique: true,
        },
        email: {
            type: dataTypes.STRING(64),
            allowNull: true,
            unique: true,
        },
        facebook: {
            type: dataTypes.STRING(256),
            allowNull: true,
        },
        twitter: {
            type: dataTypes.STRING(256),
            allowNull: true,
        },
        instagram: {
            type: dataTypes.STRING(256),
            allowNull: true,
        },
        country: {
            type: dataTypes.STRING(64),
            allowNull: true,
        },
        city: {
            type: dataTypes.STRING(64),
            allowNull: true,
        },
        ip: {
            type: dataTypes.STRING(64),
            allowNull: true,
        },
        os: {
            type: dataTypes.STRING(64),
            allowNull: true,
        },
        browser: {
            type: dataTypes.STRING(64),
            allowNull: true,
        },
        geolocation: {
            type: dataTypes.STRING(64),
            allowNull: true,
        },
        gender: {
            type: dataTypes.STRING(64),
            allowNull: true,
        },
        age: {
            type: dataTypes.STRING(64),
            allowNull: true,
        },
    }, {
        tableName: 'user',
    });
};
