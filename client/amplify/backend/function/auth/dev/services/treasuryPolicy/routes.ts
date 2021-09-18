import express from 'express';
import * as controller from './controller';

export const treasuryPolicyRouter = express.Router();

treasuryPolicyRouter.route('/').get(controller.find);

treasuryPolicyRouter.route('/').patch(controller.patch);
