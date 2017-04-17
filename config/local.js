/**
 * local.js
 *
 * Local file is the setup required for running the app locally
 *
 * @author  Dilip <dilip.more@bridgelabz.com>
 * @license ICS
 * @version 1.0
 */
;
var winston = require('winston'),
    dateFormat = require('dateformat'),
    moment = require('moment');

/**
 * @exports : Exports local Config Environment based Configuration
 *
 */
module.exports = function(config) {
    return {
        "name": 'local',
        "host": 'localhost',
        "port": process.env.NODE_PORT || 1337,
        "companyDetails": function() {
            try {
                return require('./static/companys');
            } catch (e) {
                console.log("Configuration for Company Details not set. " + dirname(__FILE__));
                process.exit(0);
            }
        },
        "session": {
            "key": 'the.express.session.id',
            "secret": 'something.super.secret'
        },
        "jwt": {
            "secret": "MyS3cr3tK3Y",
            "session": {
                "session": false
            }
        },
        'ttl': 3600000, //1 hour
        'security': {
            'application': function() {
                return this.config;
            },
            'config': null
        },
        'resetTokenExpiresMinutes': 20, //20 minutes later
        "swagger": true,
        "database": {
            "debug": true,
            "mongodb": {
                "name": "fundoohr",
                "dbURI": "mongodb://127.0.0.1:27017/fundoohrtest1",
                "username": "",
                "password": ""
            }
        },
        "logger": new winston.Logger({
            "transports": [
                new winston.transports.File({
                    "level": 'error',
                    "filename": config.logDir + "/app.log",
                    "handleExceptions": true,
                    "json": true,
                    "maxsize": 5242880, //5MB
                    "maxFiles": 100,
                    "colorize": false,
                    "prettyPrint": true,
                    "zippedArchive": true,
                    "colorize": "all",
                    "timestamp": function() {
                        return "" + dateFormat(new Date(), "ddd MMM D YYYY h:mm:ss a Z") + ""
                    },
                    "formatter": function(options) {
                        // Return string will be passed to logger.
                        var message = options.timestamp() + ' [' + options.level.toUpperCase() + '] - ' + (undefined !== options.message ? options.message : '') +
                            (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
                        return winston.config.colorize(options.level, message);
                    }
                }), new winston.transports.Console({
                    "level": ['info', 'error', 'warn', 'log', 'debug'],
                    "handleExceptions": true,
                    "json": true,
                    "prettyPrint": true,
                    "humanReadableUnhandledException": true,
                    "colorize": "all",
                    "timestamp": function() {
                        return "" + dateFormat(new Date(), "ddd MMM D YYYY h:mm:ss a Z") + ""
                    },
                    "formatter": function(options) {
                        // Return string will be passed to logger.
                        var message = options.timestamp() + ' [' + options.level.toUpperCase() + '] - ' + (undefined !== options.message ? options.message : '') +
                            (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
                        return winston.config.colorize(options.level, message);
                    }
                })
            ],
            "exitOnError": false,
            "emitErrs": true,
            "levels": config.levels,
            "colors": config.colors
        }),
        "stream": {
            write: function(message, encoding) {
                this.logger.info(message);
            }
        }
    };
};