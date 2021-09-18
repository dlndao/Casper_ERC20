"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const sequelize_1 = require("sequelize");
class Borrow extends sequelize_1.Model {
    id;
    address;
    description;
    title;
    term;
    startDate;
    createDate;
    updateDate;
    amount;
    currentBalance;
    monthsToRepay;
    status;
}
exports.Borrow = Borrow;
