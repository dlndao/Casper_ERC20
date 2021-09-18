import express from 'express';

import { authRouter } from './auth';
import { userRouter } from './users';
import { nftRouter } from './nft';
import { treasuryPolicyRouter } from './treasuryPolicy';
import { borrowRouter } from './borrow';
import { mfiRouter } from './mfis';

export const services = express.Router();

services.use('/auth', authRouter);
services.use('/users', userRouter);
services.use('/nft', nftRouter);
services.use('/policies', treasuryPolicyRouter);
services.use('/borrow', borrowRouter);
services.use('/mfi', mfiRouter);
