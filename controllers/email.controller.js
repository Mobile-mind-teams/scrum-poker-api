const transporter = require('../config/email.transporter');

class EmailController{
  constructor() {}

  async sendEmail (data, res) {

    const email = {
      from: data.from,
      to: data.to,
      subject: data.subject,
      text: "",
      html: data.html
    };

    transporter.sendMail(email, (error, info) => {
      if (error) {
        res.status(506).json({message: "Something went wrong!", error: error});
      } else {
        res.status(201).json({message: "Success!", callback_info: info});
      }
    });
  };

}

module.exports = EmailController
