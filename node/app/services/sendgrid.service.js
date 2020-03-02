/**
 * Define the SendGris service
 */

// Require the Sendgrid app
const sgMail = require('@sendgrid/mail');

/* Define our Sendgrid method */
exports.sendgridService = ( req ) => {
    // ToDo: !! this is for testing !!
    //console.log(process.env.SENDGRID_API_KEY);
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: req.body.sender,
        from: req.body.receiver,
        subject: req.body.subject,
        text: req.body.message,
        html: '<strong>' + req.body.message + '</strong>',
    };
    return sgMail.send(msg);
};