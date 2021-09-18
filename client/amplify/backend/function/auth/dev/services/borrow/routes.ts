import express from 'express';

import * as controller from './controller';

export const borrowRouter = express.Router();

borrowRouter.route('/').get(controller.find);

borrowRouter.route('/findOne').get(controller.get);

borrowRouter.route('/').post(controller.create);

borrowRouter.route('/update').patch(controller.patch);

borrowRouter.route('/sendBackInvitation').post(controller.sendBackInvitation);
