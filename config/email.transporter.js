var nodemailer = require('nodemailer');
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.mail.me.com',
  port: 587,               // true for 465, false for other ports
  secure: false,
  auth: {
      user: 'charliebarttlet@icloud.com',
      pass: 'konr-quzd-veis-agkj',
    },
  });

  module.exports = transporter;
