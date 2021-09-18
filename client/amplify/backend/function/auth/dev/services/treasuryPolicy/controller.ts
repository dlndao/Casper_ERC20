import { NextFunction, Request, Response } from 'express';
import cron from 'node-cron';

import { TreasuryPolicy } from '../../models/treasuryPolicy.model';
import { invest } from './timeBasedPolicy.service';

export const find = (req: Request, res: Response, next: NextFunction) => {
  return TreasuryPolicy.findAll()
    .then((policies: TreasuryPolicy[]) => res.json(policies))
    .catch(next);
};

export const patch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return await TreasuryPolicy.bulkCreate(req.body, {
    updateOnDuplicate: ['value', 'active'],
  })
    .then((policies: TreasuryPolicy[] | null) => {
      const timeBasedPolicy = policies.find((policy) => policy.id === 2);
      let activeCron;
      console.log(timeBasedPolicy.active);

      if (timeBasedPolicy.active) {
        activeCron = activateTimeBasedPolicy(activeCron, timeBasedPolicy.value);
      }

      return policies
        ? res.json(policies.map((el) => el.get({ plain: true })))
        : res.status(401).send({
            error: `Failed to update policies`,
          });
    })
    .catch(next);
};

const activateTimeBasedPolicy = (job, time) => {
  if (job) {
    job.stop();
  }
  const divisor_for_minutes = time % (60 * 60);
  const divisor_for_seconds = divisor_for_minutes % 60;

  let sec = time < 60 ? `*/${Math.ceil(divisor_for_seconds)}` : '*';
  let min =
    time >= 60 && time < 3600
      ? `*/${Math.floor(divisor_for_minutes / 60)}`
      : '*';
  let hr =
    time >= 3600 && time < 86400 ? `*/${Math.floor(time / (60 * 60))}` : '*';

  const policy =
    sec.toString() == '*' ? `${min} ${hr} * * *` : `${sec} ${min} ${hr} * * *`;

  return cron.schedule(policy, () => {
    invest();
  });
};

const deactivateTimeBasedPolicy = (activeCron) => {
  activeCron.stop();
};
