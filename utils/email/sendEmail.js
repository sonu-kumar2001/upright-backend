const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const sendEmail = (res, email, subject, payload, template, messsage) => {
  try {
    const emailTemplateSource = fs.readFileSync(
      path.join(__dirname, template),
      "utf8"
    );
    const compiledTemplate = handlebars.compile(emailTemplateSource);

    const mailSettings = {
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_EMAIL,
        pass: process.env.MAIL_PASSWORD,
      },
    };

    const smtpTransport = nodemailer.createTransport(mailSettings);
    const options = () => ({
      from: process.env.MAIL_EMAIL,
      to: email,
      subject,
      html: compiledTemplate(payload),
    });
    // Send email
    smtpTransport.sendMail(options(), (error) => {
      if (error) {
        console.log(error);
        return res.json({
          error: error.message,
        });
      }
      return res.json({ message: messsage });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;
