import AWS from 'aws-sdk';
import { backEmailInvitationTemplate } from './emailTemplates/backEmailInvitation';

// AWS.config.setPromisesDependency('');
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: 'us-west-2',
});

const backInvite = async (
  sendToMail,
  title,
  description,
  amount,
  term,
  address
) => {
  AWS.config.update({
    region: 'us-west-2',
  });
  const subject = `DLN Back Invitation`;
  const htmlBody = backEmailInvitationTemplate(
    title,
    description,
    amount,
    term,
    address
  );
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

  const response = await new AWS.SES({ apiVersion: '2010-12-01' })
    .sendEmail(sesParams)
    .promise();

  return response.MessageId;
};

export { backInvite };
