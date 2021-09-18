"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Op = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
Object.defineProperty(exports, "Op", { enumerable: true, get: function () { return sequelize_1.Op; } });
const models_1 = require("./models");
const models_2 = require("./models");
const models_3 = require("./models");
const models_4 = require("./models");
const models_5 = require("./models");
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
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
exports.sequelize = sequelize;
// Init all models
models_1.User.init({
    id: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    nonce: {
        allowNull: false,
        type: sequelize_1.INTEGER.UNSIGNED,
        defaultValue: () => Math.floor(Math.random() * 10000), // Initialize with a random nonce
    },
    publicAddress: {
        allowNull: false,
        type: sequelize_1.STRING,
        unique: true,
        validate: { isLowercase: true },
    },
    username: {
        type: sequelize_1.STRING(64),
        unique: true,
        allowNull: true,
    },
    firstName: {
        type: sequelize_1.STRING(64),
        allowNull: true,
    },
    lastName: {
        type: sequelize_1.STRING(64),
        allowNull: true,
    },
    phone: {
        type: sequelize_1.STRING(16),
        allowNull: true,
        unique: true,
    },
    email: {
        type: sequelize_1.STRING(64),
        allowNull: true,
        unique: true,
    },
    facebook: {
        type: sequelize_1.STRING,
        allowNull: true,
    },
    twitter: {
        type: sequelize_1.STRING,
        allowNull: true,
    },
    instagram: {
        type: sequelize_1.STRING,
        allowNull: true,
    },
    telegram: {
        type: sequelize_1.STRING,
        allowNull: true,
    },
    country: {
        type: sequelize_1.STRING(64),
        allowNull: true,
    },
    city: {
        type: sequelize_1.STRING(64),
        allowNull: true,
    },
    ip: {
        type: sequelize_1.STRING(64),
        allowNull: true,
    },
    os: {
        type: sequelize_1.STRING(64),
        allowNull: true,
    },
    browser: {
        type: sequelize_1.STRING(64),
        allowNull: true,
    },
    geolocation: {
        type: sequelize_1.STRING(64),
        allowNull: true,
    },
    gender: {
        type: sequelize_1.STRING(16),
        allowNull: true,
    },
    age: {
        type: sequelize_1.STRING(16),
        allowNull: true,
    },
    myReferralCode: {
        type: sequelize_1.STRING(16),
        allowNull: true,
    },
    referredByCode: {
        type: sequelize_1.STRING(16),
        allowNull: true,
    },
    isAdmin: {
        type: sequelize_1.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
    isNFTMemberEnabled: {
        type: sequelize_1.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
    isNFTAdminEnabled: {
        type: sequelize_1.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
}, {
    modelName: 'user',
    sequelize,
    timestamps: false,
});
models_2.NFT.init({
    id: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    address: {
        allowNull: false,
        type: sequelize_1.STRING,
    },
    tokenId: {
        type: sequelize_1.INTEGER,
        allowNull: false,
    },
    isNFTMemberEnabled: {
        type: sequelize_1.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
    isNFTAdminEnabled: {
        type: sequelize_1.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
}, {
    modelName: 'nft',
    sequelize,
    timestamps: false,
});
models_4.TreasuryPolicy.init({
    id: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    description: {
        allowNull: false,
        type: sequelize_1.STRING,
    },
    value: {
        type: sequelize_1.INTEGER,
        allowNull: true,
    },
    active: {
        type: sequelize_1.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    modelName: 'treasuryInvestmentPolicy',
    sequelize,
    timestamps: false,
});
models_3.Borrow.init({
    id: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    address: {
        allowNull: false,
        type: sequelize_1.STRING,
    },
    description: {
        allowNull: false,
        type: sequelize_1.STRING,
    },
    term: {
        allowNull: true,
        type: sequelize_1.STRING,
    },
    title: {
        allowNull: true,
        type: sequelize_1.STRING,
    },
    amount: {
        type: sequelize_1.INTEGER,
        allowNull: true,
    },
    currentBalance: {
        type: sequelize_1.INTEGER,
        allowNull: true,
    },
    createDate: {
        type: sequelize_1.DATE,
        defaultValue: sequelize_1.NOW,
        allowNull: false,
    },
    updateDate: {
        type: sequelize_1.DATE,
        allowNull: true,
    },
    startDate: {
        type: sequelize_1.DATE,
        allowNull: true,
    },
    monthsToRepay: {
        type: sequelize_1.INTEGER,
        allowNull: true,
    },
    status: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
}, {
    modelName: 'borrow',
    sequelize,
    timestamps: false,
});
models_5.MFI.init({
    id: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        allowNull: true,
        type: sequelize_1.STRING,
    },
    website: {
        allowNull: true,
        type: sequelize_1.STRING,
    },
    phone: {
        allowNull: true,
        type: sequelize_1.STRING,
    },
    email: {
        allowNull: true,
        type: sequelize_1.STRING,
    },
    logo: {
        allowNull: true,
        type: sequelize_1.STRING,
    }
}, {
    modelName: 'mfi',
    sequelize,
    timestamps: false,
});
