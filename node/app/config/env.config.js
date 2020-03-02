/**
 * Defines some basic configuration values
 * Todo: !! Its worth noting that this config could be loaded via the ENV
 */

/* Update this according to the environment and URL served */
module.exports = {
    "port": 8080,
    "appEndpoint": "http://192.168.1.140:8000",
    "apiEndpoint": "http://192.168.1.140:8000",
    "jwt_secret": "myTestJwtSecret",
    "jwt_expiration_in_seconds": 36000,
    "environment": "dev",
    "allowedDomains": [
        "mfmaw.com",
        "gilbert-rehling.com"
    ]
};