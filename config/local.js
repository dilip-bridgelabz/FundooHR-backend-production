/**
 * local.js
 *
 * Local file is the setup required for running the app locally
 *
 * @author  Dilip <dilip.more@bridgelabz.com>
 * @license ICS
 * @version 1.0
 */
;var  winston = require('winston')
    , moment = require('moment');

/**
 * @exports : Exports local Config Environment based Configuration
 *
 */
module.exports = {
      "name": 'local'
    , "host": 'localhost'
    , "port": process.env.NODE_PORT || 1337
    , "session": {
          "key": 'the.express.session.id'
        , "secret": 'something.super.secret'
    }
    , 'ttl': 3600000 //1 hour
    , 'resetTokenExpiresMinutes': 20 //20 minutes later
    , "swagger": true
    , "database": {
        "mongodb" : {
              "name": "fundoohr"
            , "dbURI": "mongodb://127.0.0.1:27017/fundoohr"
            , "username": ""
            , "password": ""
        }
    }
    , "logger": new winston.Logger({
        "transports": [
            new winston.transports.File({
                  "level": 'error'
                , "filename": './logs/all-logs.log'
                , "handleExceptions": true
                , "json": true
                , "maxsize": 5242880 //5MB
                , "maxFiles": 100
                , "colorize": false
                , "prettyPrint": true
                , "zippedArchive": true
                , "timestamp": function() {
                    return moment.utc().format('ddd MMM D YYYY h:mm:ss a Z');
                }
            })
            , new winston.transports.Console({
                  "level": ['info', 'error', 'warn', 'info', 'debug']
                , "handleExceptions": true
                , "json": true
                , "colorize": true
                , "prettyPrint": true
                , "humanReadableUnhandledException": true
                , "timestamp": function() {
                    return moment.utc().format('ddd MMM D YYYY h:mm:ss a Z');
                }
            })
        ]
        , "exitOnError": false
        , "emitErrs": true
    })
    , "stream": {
        write: function(message, encoding) {
            this.logger.info(message);
        }
    }
};
