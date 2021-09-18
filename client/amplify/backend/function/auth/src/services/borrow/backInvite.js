"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.backInvite = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const backEmailInvitation_1 = require("./emailTemplates/backEmailInvitation");
// AWS.config.setPromisesDependency('');
aws_sdk_1.default.config.update({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: 'us-west-2',
});
const backInvite = async (sendToMail, title, description, amount, term, address) => {
    aws_sdk_1.default.config.update({
        region: 'us-west-2',
    });
    const subject = `DLN Back Invitation`;
    const htmlBody = backEmailInvitation_1.backEmailInvitationTemplate(title, description, amount, term, address);
    const sesParams = {
        Destination: {
            ToAddresses: [sendToMail],
        },
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: htmlBody,
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: subject,
            },
        },
        Source: `hello@dln.org`,
    };
    const response = await new aws_sdk_1.default.SES({ apiVersion: '2010-12-01' })
        .sendEmail(sesParams)
        .promise();
    return response.MessageId;
};
exports.backInvite = backInvite;
