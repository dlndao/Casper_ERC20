"use strict";
// const awsServerlessExpress = require('aws-serverless-express');
// const app = require('./app');
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_serverless_express_1 = __importDefault(require("aws-serverless-express"));
const app_1 = require("./app");
const server = aws_serverless_express_1.default.createServer(app_1.app);
exports.handler = (event, context) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    aws_serverless_express_1.default.proxy(server, event, context);
};
