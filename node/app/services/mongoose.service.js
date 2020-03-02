/**
 *  This defines the Mongoose MongoDB adapter
 */

const mongoose = require('mongoose');
let count = 0;

// some db options
// Todo: !! a couple of the options (reconnectTries & reconnectInterval) are throwing deprecated warning - need to investigate further !!
const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: 30, // Retry up to 30 times
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    // getting rid off the depreciation errors
    useNewUrlParser: true,
    useUnifiedTopology: true

};

// this method can be looped until it connects
const connectWithRetry = () => {
    console.log('MongoDB connection with reattempts: ' + count);
    mongoose.connect("mongodb://localhost/email-service", options).then(() => {
        console.log('MongoDB connection established');

    }).catch(err => {
        console.log('MongoDB connection failed with err: ' + err, ++count);
        setTimeout(connectWithRetry, 4000)
    })
};

// initialise
connectWithRetry();

exports.mongoose = mongoose;
