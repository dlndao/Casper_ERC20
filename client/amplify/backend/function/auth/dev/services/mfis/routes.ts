import express from 'express';
import * as controller from './controller';

export const mfiRouter = express.Router();

/** GET /api/mfi */
mfiRouter.route('/').get(controller.find);
