/**
 *  Defines a model for logging actions
 */

/* Requires the Mongoose MongoDB adapter */
const mongoose = require('./mongoose.service').mongoose;
const Schema = mongoose.Schema;

/* Define the log schema */
const LogSchema = new Schema({
    context: String,
    action: String,
    message: String,
    timeStamp: Number
});

// id is a virtual field
LogSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
LogSchema.set('toJSON', {
    virtuals: true
});

/* Define the log model */
const Log = mongoose.model('Log', LogSchema);

/* Define a method to save logging data */
exports.saveLog = (logData) => {
    let log = new Log(logData);
    return log.save( (err, log) => {
        if (err) {
            // Todo: remove console logs for prod !!
            console.error(err);
        }
    });
};