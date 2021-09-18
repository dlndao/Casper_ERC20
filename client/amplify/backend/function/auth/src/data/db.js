'use strict';
const dbConfig = {};
const config = require('../../configs/dev');
const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    logging: false,
    define: {
        timestamps: false,
    },
});
const modelsPath = path.join(__dirname, 'models');
fs.readdirSync(modelsPath)
    .filter((file) => {
    return file.indexOf('.') !== 0 && file.slice(-3) === '.js';
})
    .forEach((file) => {
    var model = sequelize['import'](path.join(modelsPath, file));
    db[model.name] = model;
});
dbConfig.sequelize = sequelize;
dbConfig.Sequelize = Sequelize;
module.exports = dbConfig;
