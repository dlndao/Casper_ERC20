"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreasuryPolicy = void 0;
const sequelize_1 = require("sequelize");
class TreasuryPolicy extends sequelize_1.Model {
    id;
    description;
    value;
    active;
}
exports.TreasuryPolicy = TreasuryPolicy;
