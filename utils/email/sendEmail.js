const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");
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
    const mailgunAuth = {
      auth: {
        api_key: process.env.EMAIL_API_KEY,
        domain: process.env.DOMAIN,
      },
    };

    const smtpTransport = nodemailer.createTransport(mg(mailgunAuth));
    const options = () => ({
      from: process.env.FROM_EMAIL,
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
