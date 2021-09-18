"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFT = void 0;
const sequelize_1 = require("sequelize");
class NFT extends sequelize_1.Model {
    id;
    tokenId;
    address;
    isNFTMemberEnabled;
    isNFTAdminEnabled;
}
exports.NFT = NFT;
