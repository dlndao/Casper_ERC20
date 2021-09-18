"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.counterRouter = exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_jwt_1 = __importDefault(require("express-jwt"));
const config_1 = require("../../config");
const controller = __importStar(require("./controller"));
exports.userRouter = express_1.default.Router();
exports.counterRouter = express_1.default.Router();
/** GET /api/users */
exports.userRouter.route('/').get(controller.find);
exports.userRouter.route('/getReferralCount').get(controller.getReferralCount);
exports.userRouter.route('/getReferralsCounts').get(controller.getReferralsCounts);
exports.userRouter.route('/countriesCount').get(controller.getCountriesCount);
/** GET /api/users/:userId */
/** Authenticated route */
exports.userRouter
    .route('/:userId')
    .get(express_jwt_1.default({ secret: config_1.config.secret, algorithms: ['HS256'] }), controller.get);
/** POST /api/users */
exports.userRouter.route('/').post(controller.create);
/** PATCH /api/users/:userId */
/** Authenticated route */
exports.userRouter
    .route('/:userId')
    .patch(express_jwt_1.default({ secret: config_1.config.secret, algorithms: ['HS256'] }), controller.patch);
