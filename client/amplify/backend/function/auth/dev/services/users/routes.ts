import express from 'express';
import jwt from 'express-jwt';

import { config } from '../../config';
import * as controller from './controller';

export const userRouter = express.Router();
export const counterRouter = express.Router();

/** GET /api/users */
userRouter.route('/').get(controller.find);
userRouter.route('/getReferralCount').get(controller.getReferralCount);
userRouter.route('/getReferralsCounts').get(controller.getReferralsCounts);
userRouter.route('/countriesCount').get(controller.getCountriesCount);

/** GET /api/users/:userId */
/** Authenticated route */
userRouter
  .route('/:userId')
  .get(jwt({ secret: config.secret, algorithms: ['HS256'] }), controller.get);

/** POST /api/users */
userRouter.route('/').post(controller.create);

/** PATCH /api/users/:userId */
/** Authenticated route */
userRouter
  .route('/:userId')
  .patch(
    jwt({ secret: config.secret, algorithms: ['HS256'] }),
    controller.patch
  );
