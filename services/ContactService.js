// Public modules
const _ = require('lodash');
const async = require('async');

// App modules
const daoService = require('../repository/ContactDAO');
const emailUtility = require('../utils/EmailUtility');
const config = require('../appConfig');

class ContactService {

    constructor() {
    }

    saveMessageAndNotify(params, fnCallback) {
        async.waterfall([
            (callback) => {
                if (_.isEmpty(params.name) || _.isEmpty(params.email) || _.isEmpty(params.message)) {
                    return callback({code: 403, msg: "Invalid input"});
                } else {
                    return callback();
                }
            },
//            (callback) => {
//                daoService.saveMessage(params.name, params.email, params.message)
//                    .then(() => {
//                        return callback();
//                    })
//                    .catch((error) => {
//                        console.log('Unable to save message', error);
//                        return callback({code: 500, msg: 'Unable to submit the request'});
//                    })
//            },
            (callback) => {
                const to = config.personal.email;
                const subject = 'GaleArt';
                const body = 'Name: ' + params.name + '\n' + 'Email: ' + params.email + '\n\n' + params.message;
                emailUtility.sendEmail(to, subject, body)
                .then((successMsg) => {
                    return callback();
                })
                .catch((error) => {
                    console.log('Unable to send the email', error);
                    return callback({code: 500, msg: 'Unable to submit the request'});
                })
            }
        ], (error, success) => {
            if (error) {
                return fnCallback(error);
            } else {
                return fnCallback(null, 'Request submitted');
            }
        });
    }
}

module.exports = new ContactService();