const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, body }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text: body
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
