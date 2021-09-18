"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountriesCount = exports.getReferralsCounts = exports.getReferralCount = exports.patch = exports.create = exports.get = exports.find = void 0;
const user_model_1 = require("../../models/user.model");
const db_1 = require("../../db");
const find = (req, res, next) => {
    // If a query string ?publicAddress=... is given, then filter results
    const whereClause = req.query &&
        req.query.publicAddress && {
        where: { publicAddress: req.query.publicAddress },
    };
    return user_model_1.User.findAll(whereClause)
        .then((users) => res.json(users))
        .catch(next);
};
exports.find = find;
const get = (req, res, next) => {
    // AccessToken payload is in req.user.payload, especially its `id` field
    // UserId is the param in /users/:userId
    // We only allow user accessing herself, i.e. require payload.id==userId
    if (req.user.payload.id !== +req.params.userId) {
        return res.status(401).send({ error: 'You can can only access yourself' });
    }
    return user_model_1.User.findByPk(req.params.userId)
        .then((user) => res.json(user))
        .catch(next);
};
exports.get = get;
const create = async (req, res, next) => {
    user_model_1.User.create(req.body)
        .then((user) => res.json(user))
        .catch(next);
};
exports.create = create;
const patch = (req, res, next) => {
    // Only allow to fetch current user
    if (req.user.payload.id !== +req.params.userId &&
        !req.body.isAdmin) {
        return res.status(401).send({ error: 'You can can only access yourself' });
    }
    return user_model_1.User.findByPk(req.params.userId)
        .then((user) => {
        if (!user) {
            return user;
        }
        Object.assign(user, req.body);
        return user.save();
    })
        .then((user) => {
        return user
            ? res.json(user)
            : res.status(401).send({
                error: `User with publicAddress ${req.params.userId} is not found in database`,
            });
    })
        .catch(next);
};
exports.patch = patch;
const getReferralCount = (req, res, next) => {
    if (!req.query.myReferralCode) {
        return res.status(401).send({ error: 'Referral code is missing' });
    }
    const whereClause = req.body &&
        req.query.myReferralCode && {
        where: { referredByCode: req.query.myReferralCode },
    };
    return user_model_1.User.findAll(whereClause)
        .then((users) => res.json(users.length))
        .catch(next);
};
exports.getReferralCount = getReferralCount;
const getReferralsCounts = async (req, res, next) => {
    const whereClause = req.query &&
        req.query.myReferralCode && {
        where: {
            referredByCode: req.query.myReferralCode,
        },
    };
    await user_model_1.User.findAll({
        attributes: {
            include: [
                [
                    db_1.sequelize.fn('count', db_1.sequelize.col('referredByCode')),
                    'referredByCount',
                ],
            ],
        },
        group: ['referredByCode'],
        ...whereClause,
    })
        .then((users) => res.json(users))
        .catch(next);
};
exports.getReferralsCounts = getReferralsCounts;
const getCountriesCount = (req, res, next) => {
    const whereClause = req.body &&
        req.query.myReferralCode && {
        where: { referredByCode: req.query.myReferralCode },
    };
    return user_model_1.User.aggregate('country', 'DISTINCT', { plain: false })
        .then((countries) => res.json(countries.length))
        .catch(next);
};
exports.getCountriesCount = getCountriesCount;
