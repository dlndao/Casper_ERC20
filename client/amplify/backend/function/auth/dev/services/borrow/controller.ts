import { NextFunction, Request, Response } from 'express';

import { Borrow } from '../../models/borrow.model';

import { backInvite } from './backInvite';

export const find = (req: Request, res: Response, next: NextFunction) => {
  const whereClause: any = req.query &&
    req.query.id && {
      where: {
        id: req.query.id,
      },
    };

  return Borrow.findAll(whereClause)
    .then((borrows: Borrow[]) => res.json(borrows))
    .catch(next);
};

export const get = (req: Request, res: Response, next: NextFunction) => {
  const whereClause: any = req.query &&
    req.query.id && {
      where: {
        id: req.query.id,
      },
    };
  return Borrow.findOne(whereClause)
    .then((borrow: Borrow | null) => res.json(borrow))
    .catch(next);
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Borrow.create(req.body)
    .then((borrow: Borrow) => res.json(borrow))
    .catch(next);
};

export const patch = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.query);

  const whereClause: any = req.query &&
    req.query.id && {
      where: {
        id: req.query.id,
      },
    };
  return Borrow.findOne(whereClause)
    .then((borrow: Borrow | null) => {
      if (!borrow) {
        return borrow;
      }

      Object.assign(borrow, req.body);
      return borrow.save();
    })
    .then((borrow: Borrow | null) => {
      return borrow
        ? res.json(borrow)
        : res.status(401).send({
            error: `Borrow with id ${req.params.id} is not found in database`,
          });
    })
    .catch(next);
};

export const sendBackInvitation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { sendToMail, title, description, amount, term, address } = req.body;
  backInvite(sendToMail, title, description, amount, term, address)
    .then((messageId) => res.json(messageId))
    .catch(next);
};
