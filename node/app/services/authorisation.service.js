/**
 * Defines a simple authorisation service
 */

/* Requires the configuration data */
const config = require('../config/env.config');

exports.checkDomain = (email) => {
    let arr     = email.split("@");
    let domain  = arr[1],
        domains = config.allowedDomains,
        found = false;

    for (const allowed of domains) {
        if (allowed === domain) {
            found = true;
        }
    }
    // return the result
    return found;
};