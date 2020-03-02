/**
 * Define some middleware methods that can be used to validate incoming requests
 */

/* Require JWT for basic auth handling */
const jwt = require('jsonwebtoken'),
    secret = require('../config/env.config.js').jwt_secret; // Todo: !! this would be an ENV config value in real life !!

/* A rudimentary method for faking some JTW validation */
exports.validateJwt =  (req, res, next) => {
    if (req.headers['authorisation']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                // return res.status(401).send();

            } else {
                req.jwt = jwt.verify(authorization[1], secret);
                return next();
            }
        }
        catch (err) {
            // return res.status(403).send();
        }

    } else {
        // return res.status(401).send();
    }
    // Todo: we are just faking this functionality for now
    return next();
};