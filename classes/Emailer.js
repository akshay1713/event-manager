const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const transporter = nodemailer.createTransport(smtpTransport({
    service: 'Gmail',
    auth: {
        user: 'akshaysingh.8128@gmail.com',
        pass: '3v3nts44ll'
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