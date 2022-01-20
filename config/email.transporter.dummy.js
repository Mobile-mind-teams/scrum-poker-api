var nodemailer = require('nodemailer');
// create reusable transporter object using the non secure SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.host.com',
  port: 587,               // true for 465, false for other ports
  secure: false,
  auth: {
      user: 'user@host.domain',
      pass: 'password',
    },
  });

  module.exports = transporter;
