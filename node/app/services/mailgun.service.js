/**
 * Define the MailGun service
 */

// Require the Mailgun app
const mailgun = require("mailgun-js");

/* Define our Mailgun method */
exports.mailgunService = ( req ) => {
    // ToDo: !! Mailgun seems to have a restricted DOMAIN test environment - ensure its configured in the ENV correctly !!
    const DOMAIN = process.env.MAILGUN_DOMAIN;
    // from: "Mailgun Sandbox <postmaster@sandbox167b2b6c05724fccb278bdac9200981c.mailgun.org>",
    // ToDo: !! this is for testing !!
    //console.log(process.env.MAILGUN_API_KEY);
    const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: "sandbox167b2b6c05724fccb278bdac9200981c.mailgun.org" });
    const data = {
        from: req.body.sender,
        to: req.body.receiver,
        subject: req.body.subject,
        text: req.body.message
    };
    return mg.messages().send(data);
};