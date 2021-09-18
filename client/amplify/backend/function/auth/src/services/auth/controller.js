"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const eth_sig_util_1 = require("eth-sig-util");
const ethereumjs_util_1 = require("ethereumjs-util");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const user_model_1 = require("../../models/user.model");
const create = async (req, res, next) => {
    const { signature, publicAddress } = req.body;
    if (!signature || !publicAddress)
        return res
            .status(400)
            .send({ error: 'Request should have signature and publicAddress' });
    return await user_model_1.User.findOne({ where: { publicAddress } })
        ////////////////////////////////////////////////////
        // Step 1: Get the user with the given publicAddress
        ////////////////////////////////////////////////////
        .then((user) => {
        if (!user) {
            res.status(401).send({
                error: `User with publicAddress ${publicAddress} is not found in database`,
            });
            return null;
        }
        return user;
    })
        ////////////////////////////////////////////////////
        // Step 2: Verify digital signature
        ////////////////////////////////////////////////////
        .then((user) => {
        if (!(user instanceof user_model_1.User)) {
            // Should not happen, we should have already sent the response
            throw new Error('User is not defined in "Verify digital signature".');
        }
        const mappedUser = user.toJSON();
        const msg = `Sign DLN DAO contribution access: ${mappedUser.nonce}`;
        // const msg = `Sign DLN DAO contribution access: ${user.nonce}`;
        // We now are in possession of msg, publicAddress and signature. We
        // will use a helper from eth-sig-util to extract the address from the signature
        const msgBufferHex = ethereumjs_util_1.bufferToHex(Buffer.from(msg, 'utf8'));
        // const msgBufferHex = `0x${Buffer.from(msg, 'utf8').toString('hex')}`;
        const address = eth_sig_util_1.recoverPersonalSignature({
            data: msgBufferHex,
            sig: signature,
        });
        // The signature verification is successful if the address found with
        // sigUtil.recoverPersonalSignature matches the initial publicAddress
        if (address.toLowerCase() === publicAddress.toLowerCase()) {
            return user;
        }
        else {
            res.status(401).send({ error: 'Signature verification failed' });
            return null;
        }
    })
        ////////////////////////////////////////////////////
        // Step 3: Generate a new nonce for the user
        ////////////////////////////////////////////////////
        .then((user) => {
        if (!(user instanceof user_model_1.User)) {
            // Should not happen, we should have already sent the response
            throw new Error('User is not defined in "Generate a new nonce for the user".');
        }
        user.nonce = Math.floor(Math.random() * 10000);
        return user.save();
    })
        ////////////////////////////////////////////////////
        // Step 4: Create JWT
        ////////////////////////////////////////////////////
        .then((user) => {
        const mappedUser = user.toJSON();
        console.log(mappedUser);
        return new Promise((resolve, reject) => 
        // https://github.com/auth0/node-jsonwebtoken
        jsonwebtoken_1.default.sign({
            payload: {
                id: mappedUser.id,
                publicAddress,
            },
        }, config_1.config.secret, {}, (err, token) => {
            if (err) {
                return reject(err);
            }
            return resolve(token);
        }));
    })
        .then((accessToken) => res.json({ accessToken }))
        .catch(next);
};
exports.create = create;
