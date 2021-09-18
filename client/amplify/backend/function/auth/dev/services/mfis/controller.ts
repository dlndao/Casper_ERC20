import { NextFunction, Request, Response } from 'express';

import { MFI } from '../../models/mfi.model';

//import { sequelize, Op } from '../../db';

export const find = (req: Request, res: Response, next: NextFunction) => {
  // If a query string ?name=... is given, then filter results
  if (req.query && req.query.name) {
    return MFI.findOne({ where: { name: req.query.name } })
      .then((data: MFI | null) => res.json(data))
      .catch(next);
  } else {
    return res
      .status(400)
      .send({ error: 'Not found' });
  }
};