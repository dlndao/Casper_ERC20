"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendBackInvitation = exports.patch = exports.create = exports.get = exports.find = void 0;
const borrow_model_1 = require("../../models/borrow.model");
const backInvite_1 = require("./backInvite");
const find = (req, res, next) => {
    const whereClause = req.query &&
        req.query.id && {
        where: {
            id: req.query.id,
        },
    };
    return borrow_model_1.Borrow.findAll(whereClause)
        .then((borrows) => res.json(borrows))
        .catch(next);
};
exports.find = find;
const get = (req, res, next) => {
    const whereClause = req.query &&
        req.query.id && {
        where: {
            id: req.query.id,
        },
    };
    return borrow_model_1.Borrow.findOne(whereClause)
        .then((borrow) => res.json(borrow))
        .catch(next);
};
exports.get = get;
const create = async (req, res, next) => {
    borrow_model_1.Borrow.create(req.body)
        .then((borrow) => res.json(borrow))
        .catch(next);
};
exports.create = create;
const patch = (req, res, next) => {
    console.log(req.query);
    const whereClause = req.query &&
        req.query.id && {
        where: {
            id: req.query.id,
        },
    };
    return borrow_model_1.Borrow.findOne(whereClause)
        .then((borrow) => {
        if (!borrow) {
            return borrow;
        }
        Object.assign(borrow, req.body);
        return borrow.save();
    })
        .then((borrow) => {
        return borrow
            ? res.json(borrow)
            : res.status(401).send({
                error: `Borrow with id ${req.params.id} is not found in database`,
            });
    })
        .catch(next);
};
exports.patch = patch;
const sendBackInvitation = async (req, res, next) => {
    const { sendToMail, title, description, amount, term, address } = req.body;
    backInvite_1.backInvite(sendToMail, title, description, amount, term, address)
        .then((messageId) => res.json(messageId))
        .catch(next);
};
exports.sendBackInvitation = sendBackInvitation;
