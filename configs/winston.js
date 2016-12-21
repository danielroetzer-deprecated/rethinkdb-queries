/**
 * Created by Rötzer on 21.12.2016.
 */



//Load winston module
const winston = require('winston');

//Initialize your own logger
const logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: 'silly',
            handleExceptions: true,
            json: false,
            timestamp: new Date(),
            colorize: true
        })
    ]
});

//Exit after logging an uncaughtException (default=true)
logger.exitOnError = true;

//Emit errors
logger.emitErrs = true;

module.exports = logger;