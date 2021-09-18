import { NextFunction, Request, Response } from 'express';

import { User } from '../../models/user.model';

import { sequelize, Op } from '../../db';

export const find = (req: Request, res: Response, next: NextFunction) => {
  // If a query string ?publicAddress=... is given, then filter results
  const whereClause: any = req.query &&
    req.query.publicAddress && {
      where: { publicAddress: req.query.publicAddress },
    };

  return User.findAll(whereClause)
    .then((users: User[]) => res.json(users))
    .catch(next);
};

export const get = (req: Request, res: Response, next: NextFunction) => {
  // AccessToken payload is in req.user.payload, especially its `id` field
  // UserId is the param in /users/:userId
  // We only allow user accessing herself, i.e. require payload.id==userId
  if ((req as any).user.payload.id !== +req.params.userId) {
    return res.status(401).send({ error: 'You can can only access yourself' });
  }
  return User.findByPk(req.params.userId)
    .then((user: User | null) => res.json(user))
    .catch(next);
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  User.create(req.body)
    .then((user: User) => res.json(user))
    .catch(next);
};

export const patch = (req: Request, res: Response, next: NextFunction) => {
  // Only allow to fetch current user
  if (
    (req as any).user.payload.id !== +req.params.userId &&
    !req.body.isAdmin
  ) {
    return res.status(401).send({ error: 'You can can only access yourself' });
  }

  return User.findByPk(req.params.userId)
    .then((user: User | null) => {
      if (!user) {
        return user;
      }

      Object.assign(user, req.body);
      return user.save();
    })
    .then((user: User | null) => {
      return user
        ? res.json(user)
        : res.status(401).send({
            error: `User with publicAddress ${req.params.userId} is not found in database`,
          });
    })
    .catch(next);
};

export const getReferralCount = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!(req as any).query.myReferralCode) {
    return res.status(401).send({ error: 'Referral code is missing' });
  }

  const whereClause: any = req.body &&
    req.query.myReferralCode && {
      where: { referredByCode: req.query.myReferralCode },
    };

  return User.findAll(whereClause)
    .then((users: User[]) => res.json(users.length))
    .catch(next);
};

export const getReferralsCounts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const whereClause: any = req.query &&
    req.query.myReferralCode && {
      where: {
        referredByCode: req.query.myReferralCode,
      },
    };

  await User.findAll({
    attributes: {
      include: [
        [
          sequelize.fn('count', sequelize.col('referredByCode')),
          'referredByCount',
        ],
      ],
    },
    group: ['referredByCode'],
    ...whereClause,
  })
    .then((users: User[]) => res.json(users))
    .catch(next);
};

export const getCountriesCount = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const whereClause: any = req.body &&
    req.query.myReferralCode && {
      where: { referredByCode: req.query.myReferralCode },
    };

  return User.aggregate('country', 'DISTINCT', { plain: false })
    .then((countries: User[]) => res.json(countries.length))
    .catch(next);
};
