# Node JS - Simple Email Service Project #
This project contains two sections:  
- A node backend which handles the emailing service and implements basic validation and logging features
- A react front-end that provides a form for testing the email service functionality

## Requirements: ##  
- Account and API key for SendGrid
- Account and API key for MailGun

## Node JS API  
Implements the following requirements:
- Express JS        (express)
- Body Parser       (body-parser)
- JSON Web Tokens   (jsonwebtokens)
- Mongoose          (mongoose)
- Sendgrid          (@sendgrid/mail)
- Mailgun           (mailgun)
- Node UUI          (node-uuid)

This service will use a MongoDB collection to implement logging for all actions. Therefore a working MongoDB daemon will be required.  

The Email service will default to Sendgrid, and use Mailgun as a failover.

The configuration provides a placeholder for Allowed Domains - which are used to test the Sender email address.  

As there is no 'public' content the structure was created manually to represent a service oriented feel, instead of using the Express generator.

## ToDo:
The JWT implementation is only a placeholder. I wont be implementing JWT in the front-end section.  
Some config values should be stored as ENV values instead of within a local config.  
The validation on the POST data is only rudimentary, and would require further checks to ensure valid content is being provided.
 
