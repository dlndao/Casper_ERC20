"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MFI = void 0;
const sequelize_1 = require("sequelize");
class MFI extends sequelize_1.Model {
    id;
    name;
    website;
    phone;
    email;
    logo;
}
exports.MFI = MFI;
