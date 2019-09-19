// Public modules
const nodemailer = require('nodemailer');

// App modules
const config = require('../appConfig');

class EmailUtility {

    constructor() {
    }

    sendEmail(to, subject, body) {
        return new Promise((resolve, reject) => {
            const transporter = nodemailer.createTransport({
                service: config.email.service,
                auth: {
                    user: config.email.username,
                    pass: config.email.password
                }
            });

            const mailOptions = {
                from: config.email.address,
                to: to,
                subject: subject,
                text: body
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(info.response);
                }
            })
        });
    }
}

module.exports = new EmailUtility();