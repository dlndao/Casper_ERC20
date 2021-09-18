"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patch = exports.create = exports.get = exports.find = void 0;
const nft_model_1 = require("../../models/nft.model");
const find = (req, res, next) => {
    const whereClause = req.query &&
        req.query.address && {
        where: {
            address: req.query.address,
            ...(req.query.tokenId && { tokenId: req.query.tokenId }),
        },
    };
    return nft_model_1.NFT.findAll(whereClause)
        .then((nfts) => res.json(nfts))
        .catch(next);
};
exports.find = find;
const get = (req, res, next) => {
    const whereClause = req.query &&
        req.query.address && {
        where: {
            address: req.query.address,
            ...(req.query.tokenId && { tokenId: req.query.tokenId }),
        },
    };
    return nft_model_1.NFT.findOne(whereClause)
        .then((nft) => res.json(nft))
        .catch(next);
};
exports.get = get;
const create = async (req, res, next) => {
    nft_model_1.NFT.create(req.body)
        .then((nft) => res.json(nft))
        .catch(next);
};
exports.create = create;
const patch = (req, res, next) => {
    console.log(req.query);
    const whereClause = req.query &&
        req.query.address && {
        where: {
            address: req.query.address,
            ...(req.query.tokenId && { tokenId: req.query.tokenId }),
        },
    };
    return nft_model_1.NFT.findOne(whereClause)
        .then((nft) => {
        if (!nft) {
            return nft;
        }
        Object.assign(nft, req.body);
        return nft.save();
    })
        .then((nft) => {
        return nft
            ? res.json(nft)
            : res.status(401).send({
                error: `NFT with address ${req.params.address} is not found in database`,
            });
    })
        .catch(next);
};
exports.patch = patch;
