const nodeMailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

module.exports.Mail = async (to, subject, body) => {
  let transporter = nodeMailer.createTransport(
    smtpTransport({
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
        user: "helpdeskapp21@gmail.com",
        pass: "eozkineivvcjdhgv",
      },
    })
  );

  let mailOptions = {
    from: "helpdeskapp21@gmail.com",
    to: to,
    subject: subject,
    text: body,
  };

  await transporter.sendMail(mailOptions, function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log({ status: true, msg: "Email sent successfully" });
    }
  });
};
