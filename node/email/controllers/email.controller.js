/**
 * Defines the controller for handling the emailing API route
 */

/* Fetch our Email services */
// SendGrid
const SendgridService = require('../../app/services/sendgrid.service');

// MailGun
const MailgunService = require('../../app/services/mailgun.service');

// set a timestamp in seconds
const timeStamp = Math.floor(Date.now() / 1000);

// Require the logging service
const LogService = require('../../app/services/logging.service');

// Require the auth service
const AuthService = require('../../app/services/authorisation.service');

/* Define the send method */
exports.send = (req, res) => {
    let sender   = req.body.sender;
    let receiver = req.body.receiver;
    let subject  = req.body.subject;
    let message  = req.body.message;

    // ensure that all elements exist !! basic test only !!
    if (!(sender && receiver && subject && message)) {
        return res.status(400).send({errors: ['Required parameters missing']});
    }

    // check that the sender's domain is authorized
    if (AuthService.checkDomain(sender)) {
        /* try SendGrid email service first !! */
        SendgridService.sendgridService(req)
            .then((response) => {

                console.log('sendgrid response:');
                console.log(response[0].statusCode);

                let statusCode = response[0].statusCode;

                if (statusCode === 200 || statusCode === 201) {

                    console.log("sendgrid success!!");
                    // success: 200 = 'No error' AND 201 = 'Successfully created'
                    // log this success
                    let logData = {
                        "type": "email",
                        "action": "send-success",
                        "message": "sendgrid sent from: " + sender + " to: " + receiver,
                        "timeStamp": timeStamp
                    };
                    LogService.saveLog(logData);

                    // send success response
                    let result = {
                        "success" : true,
                        "message": "email sent successfully"
                    };
                    res.status(200).send(result);

                } else {

                    console.log("sendgrid statusCode error!");
                    // log this
                    let timeStamp = Math.floor(Date.now() / 1000);
                    let logData = {
                        "type": "email",
                        "action": "send-failed",
                        "message": "sendgrid status code: " + statusCode,
                        "timeStamp": timeStamp
                    };
                    LogService.saveLog(logData);

                    /* Mailgun email service */
                    MailgunService.mailgunService(req)
                        .then((response) => {

                            /* Todo: !! its quite likely that we should be checking the Mailgun response as well for a failed status report !! */
                            console.log('mailgun response:');
                            console.log(response);

                            // log this success
                            let logData = {
                                "type": "email",
                                "action": "send-success",
                                "message": "mailgun sent from: " + sender + " to: " + receiver,
                                "timeStamp": timeStamp
                            };
                            LogService.saveLog(logData);

                            // send success response
                            let result = {
                                "success" : true,
                                "message": "email sent successfully"
                            };
                            res.status(200).send(result);

                        })
                        .catch((err) => {

                            console.log("caught mailgun error!");
                            console.log(err);

                            // log this
                            let timeStamp = Math.floor(Date.now() / 1000);
                            let logData = {
                                "type": "email",
                                "action": "send",
                                "message": "mailgun failed: " + err.toString(),
                                "timeStamp": timeStamp
                            };
                            LogService.saveLog(logData);


                            // all attempts failed
                            // return failed response
                            let result = {
                                "success" : false,
                                "message": "email send failed"
                            };
                            res.status(200).send(result);

                        });
                }

            })
            .catch((err) => {

                /* Todo: !! ideally this should attempt the mailgun service here too - before giving up !! */
                console.log("caught sendgrid error!");
                console.log(err);

                // log this
                let timeStamp = Math.floor(Date.now() / 1000);
                let logData = {
                    "type": "email",
                    "action": "send",
                    "message": "sendgrid failed: " + err.toString(),
                    "timeStamp": timeStamp
                };
                LogService.saveLog(logData);

                // all attempts failed
                // return failed response
                let result = {
                    "success" : false,
                    "message": "email send failed"
                };
                res.status(200).send(result);
            });

    } else {
        // log this
        let logData = {
            "type": "email",
            "action": "auth",
            "message": "sender domain check failed",
            "timeStamp": timeStamp
        };
        LogService.saveLog(logData);

        // return an error response
        return res.status(400).send({errors: ['Sender domain invalid']});
    }
};