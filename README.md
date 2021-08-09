# Node JS - Simple Email Service Project #
This project contains two sections:  
- A node backend which handles the emailing service and implements basic validation and logging features
- A react front-end that provides a form for testing the email service functionality

## Warning
This proect is quite dated and has not seen any update for 2 years.

The versions of react-scripts@3.4.0 is seriously outdated and blocks several critical security updates, as does the vesion of webpack@4.41.6

Use this as-is at ypour own risk!!

## Requirements: ##  
- Account and API key for SendGrid
- Account and API key for MailGun

Creation of two *.env files -   
sendgrid.env:
    export SENDGRID_API_KEY='<your Sendgrid API key>'
    
mailgun.env:
     export MAILGUN_DOMAIN="<your mailgun domain>"
     export MAILGUN_API_KEY="<your Mailgin API key>"  
     
Note:
Currently the Mailgun 'Domain' is hard coded - I was getting errors due to unescaped values which I think were occurring in the pre-send test.
When entering the value directly into the service the error ceased to occur - some quirk due to using the ENV - requires further investigation.  

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
The configuration allows you to set the 'listening port' - make sure your firewall accepts requests on the port you enter.  
/node/app/config/env.config.js

As there is no 'public' content the structure was created manually to represent a service oriented feel, instead of using the Express generator.

## ToDo:
The JWT implementation is only a placeholder. I wont be implementing JWT in the front-end section.  
Some config values should be stored as ENV values instead of within a local config.  
The validation on the POST data is only rudimentary, and would require further checks to ensure valid content is being provided.  
I get a security warning (Known moderate severity security vulnerability detected in hoek < 4.2.1 defined in package-lock.json) from Github related to a secondary dependency created by one of the services I have used. I'm not bothering with it as this is only a test project. I assume the vendor with eventually get their act together and sort it out.
 
## React Front End 
This is a simple front end, with a single form.

I elected to use Webpack * Babel for the builds - you will need to ensure they are available for npm.  
The build places everything into the public dir.

It uses (Axios) to POST the request to the Node API.

There is NO validation or data checks implemented.

There are also no responses returned to the front-end - I was simply using the console to verify!

The 'api' var within the EmailForm component defines the URL/URI to the Node API.  
This must be to be updated to suit your use case.

I pointed an Apache domain config to the public directory:
    /react/public

Install:  
    $cd react
    $npm run start

## End Result
I was unable to successfully test the Sendgrid service to issues with my account, and I didn't want to bother setting up another account just for this project.  
My tests confirmed that the failover to Mailgun worked as expected, and that Mailgun was successfully delivering the email.  
There is a screenshot included that shows the application in action:
####/node-email-service-ss1.jpg

Live test case (no guarantees that this will be up):  
    http://nes.gilbert-rehling.com

## Caveat
I did not bother with authentication for the MongoDB access, mostly due to the fact that I only just set it up for this project and I was building on my own private network - follow suit at your own risk!!  
<strong>Please take note of the security issue reported for HOEK versions < 4.2.1 noted earlier.</strong>

## Other projects
Golang modular API:  
    https://github.com/gilbert-rehling/go-api
    
Vanilla PHP API (created reasonably quickly with time constraints):  
    https://bitbucket.org/gilbert_savve/pets-api/src/master/
    
JS Calculator (interface only - no controls):  
    https://bitbucket.org/gilbert_savve/javascript-calculator/src/master/    
