"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
    id; // Note that the `null assertion` `!` is required in strict mode.
    nonce;
    publicAddress;
    username;
    firstName;
    lastName;
    phone;
    email;
    facebook;
    twitter;
    instagram;
    telegram;
    country;
    city;
    ip;
    os;
    browser;
    geolocation;
    gender;
    age;
    myReferralCode;
    referredByCode;
    referredByCount;
    isAdmin;
    isNFTMemberEnabled;
    isNFTAdminEnabled;
}
exports.User = User;
