import express from 'express';
import jwt from 'express-jwt';

import { config } from '../../config';
import * as controller from './controller';

export const nftRouter = express.Router();

nftRouter.route('/').get(controller.find);

nftRouter.route('/getNFT').get(
  // jwt({ secret: config.secret, algorithms: ['HS256'] }),
  controller.get
);

nftRouter.route('/').post(controller.create);

nftRouter.route('/updateNFT').patch(
  // jwt({ secret: config.secret, algorithms: ['HS256'] }),
  controller.patch
);
