"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patch = exports.find = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const treasuryPolicy_model_1 = require("../../models/treasuryPolicy.model");
const timeBasedPolicy_service_1 = require("./timeBasedPolicy.service");
const find = (req, res, next) => {
    return treasuryPolicy_model_1.TreasuryPolicy.findAll()
        .then((policies) => res.json(policies))
        .catch(next);
};
exports.find = find;
const patch = async (req, res, next) => {
    return await treasuryPolicy_model_1.TreasuryPolicy.bulkCreate(req.body, {
        updateOnDuplicate: ['value', 'active'],
    })
        .then((policies) => {
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
exports.patch = patch;
const activateTimeBasedPolicy = (job, time) => {
    if (job) {
        job.stop();
    }
    const divisor_for_minutes = time % (60 * 60);
    const divisor_for_seconds = divisor_for_minutes % 60;
    let sec = time < 60 ? `*/${Math.ceil(divisor_for_seconds)}` : '*';
    let min = time >= 60 && time < 3600
        ? `*/${Math.floor(divisor_for_minutes / 60)}`
        : '*';
    let hr = time >= 3600 && time < 86400 ? `*/${Math.floor(time / (60 * 60))}` : '*';
    const policy = sec.toString() == '*' ? `${min} ${hr} * * *` : `${sec} ${min} ${hr} * * *`;
    return node_cron_1.default.schedule(policy, () => {
        timeBasedPolicy_service_1.invest();
    });
};
const deactivateTimeBasedPolicy = (activeCron) => {
    activeCron.stop();
};
