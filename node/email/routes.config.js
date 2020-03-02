/**
 * Define the API routes for our Emailing service
 */

/* Load the required controller */
const EmailController = require('./controllers/email.controller');

/* Load the basic auth middleware */
const AuthValidationMiddleware = require('../app/middleware/auth.validation.middleware');

/* Email POST routes */
exports.routesConfig = (app) => {
   app.post('/api/email', [
       AuthValidationMiddleware.validateJwt,
       EmailController.send
   ]);
};
