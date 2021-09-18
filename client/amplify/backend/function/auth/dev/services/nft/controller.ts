import { NextFunction, Request, Response } from 'express';

import { NFT } from '../../models/nft.model';

export const find = (req: Request, res: Response, next: NextFunction) => {
  const whereClause: any = req.query &&
    req.query.address && {
      where: {
        address: req.query.address,
        ...(req.query.tokenId && { tokenId: req.query.tokenId }),
      },
    };

  return NFT.findAll(whereClause)
    .then((nfts: NFT[]) => res.json(nfts))
    .catch(next);
};

export const get = (req: Request, res: Response, next: NextFunction) => {
  const whereClause: any = req.query &&
    req.query.address && {
      where: {
        address: req.query.address,
        ...(req.query.tokenId && { tokenId: req.query.tokenId }),
      },
    };
  return NFT.findOne(whereClause)
    .then((nft: NFT | null) => res.json(nft))
    .catch(next);
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  NFT.create(req.body)
    .then((nft: NFT) => res.json(nft))
    .catch(next);
};

export const patch = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.query);

  const whereClause: any = req.query &&
    req.query.address && {
      where: {
        address: req.query.address,
        ...(req.query.tokenId && { tokenId: req.query.tokenId }),
      },
    };
  return NFT.findOne(whereClause)
    .then((nft: NFT | null) => {
      if (!nft) {
        return nft;
      }

      Object.assign(nft, req.body);
      return nft.save();
    })
    .then((nft: NFT | null) => {
      return nft
        ? res.json(nft)
        : res.status(401).send({
            error: `NFT with address ${req.params.address} is not found in database`,
          });
    })
    .catch(next);
};
