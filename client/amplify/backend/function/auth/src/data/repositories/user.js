'use strict';
const accountRepository = (module.exports = {});
const db = require('../db');
accountRepository.createUser = async (user, t) => {
    let insertedRow = await db.user.create(user, { transaction: t });
    insertedRow = insertedRow.get({ plain: true });
    return insertedRow;
};
accountRepository.updateUser = async (user, t) => {
    return await db.user.update(user, {
        where: {
            username: user.username,
        },
        transaction: t,
    });
};
accountRepository.getCurrentUserByEmailOrPhone = async (identity) => {
    let result;
    if (identity.email) {
        result = await db.user.findAll({
            where: { email: identity.email },
        });
    }
    else {
        result = await db.user.findAll({
            where: { phone: identity.phone },
        });
    }
    return result.map((c) => c.toJSON());
};
accountRepository.getCurrentUserByAddress = async (publicAddress) => {
    const result = await db.user.findAll({
        where: { publicAddress },
    });
    return result.map((c) => c.toJSON());
};
