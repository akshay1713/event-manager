const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const emailer_config = require('../config').emailer;

const transporter = nodemailer.createTransport(smtpTransport({
    service: 'Gmail',
    auth: {
        user: emailer_config.sender,
        pass: emailer_config.password
    }
}));

const Emailer = {
    sendEmail: (data) => {
        transporter.sendMail(data, (error, info) => {
            console.log("error is ",error, " and info is ", info);
        });
    }
}

module.exports = Emailer