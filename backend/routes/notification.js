const express = require('express');
const nodeMailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const router = express.Router();


router.post('/', async (req, res) => {

    let transporter = nodeMailer.createTransport(smtpTransport({
        host: 'smtp.gmail.com',
        secure: true,
        port: 465,
        auth: {
            user: 'helpdeskapp21@gmail.com',
            pass: 'eozkineivvcjdhgv'
        }
    }));

    let mailOptions = {
        from: 'helpdeskapp21@gmail.com',
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text
    };

    await transporter.sendMail(mailOptions, function (error) {
        if (error) {
            console.log(error);
            res.json({status: false, msg: 'Failed to send email'});
        } else {
            res.json({status: true, msg: 'Email sent successfully'});
        }
    });
});

module.exports = router;
