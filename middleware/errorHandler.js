const {logEvents} = require('./logEvents');

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}`, 'errLog.txt'); //create a new error entry in errLog.txt
    console.error(err.stack);   //print stack trace of error on console
    res.status(500).send(err.message);  //send back a response with error code 500 (server error)
}

module.exports = errorHandler;