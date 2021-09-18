"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.find = void 0;
const mfi_model_1 = require("../../models/mfi.model");
//import { sequelize, Op } from '../../db';
const find = (req, res, next) => {
    // If a query string ?name=... is given, then filter results
    if (req.query && req.query.name) {
        return mfi_model_1.MFI.findOne({ where: { name: req.query.name } })
            .then((data) => res.json(data))
            .catch(next);
    }
    else {
        return res
            .status(400)
            .send({ error: 'Not found' });
    }
};
exports.find = find;
