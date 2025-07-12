import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const { UKRNET_EMAIL, UKRNET_PASSWORD } = process.env;

const transport = nodemailer.createTransport({
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  auth: {
    user: UKRNET_EMAIL,
    pass: UKRNET_PASSWORD,
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  const emailOptions = {
    from: UKRNET_EMAIL,
    to,
    subject,
    html,
  };

  try {
    await transport.sendMail(emailOptions);
    console.log('📨 Email sent to:', to);
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    throw error;
  }
};
