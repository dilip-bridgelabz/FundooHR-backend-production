/**
 * production.js
 *
 * Procuction file is the final config for the live site. Do not change the content.
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
 * @exports : Exports Production (Live) Config Environment based Configuration
 *
 */
module.exports = function(config) {
    return {
        "name": 'Production',
        "host": '',
        "port": 80,
        "session": {
            "key": 'the.express.session.id',
            "secret": 'something.super.secret'
        },
        'ttl': 3600000, //1 hour
        'resetTokenExpiresMinutes': 20, //20 minutes later
        'security': {
            'application': function() {
                return this;
            },
            'config': null
        },
        "swagger": false,
        "database": {
            "mongodb": {
                "name": "fundoohr",
                "dbURI": "mongodb://127.0.0.1:27017/fundoohr",
                "username": "",
                "password": ""
            }
        },
        "logger": new winston.Logger({
            "transports": [
                new winston.transports.File({
                    "level": 'error,warn',
                    "filename": config.logDir + "/app.log",
                    "handleExceptions": true,
                    "json": true,
                    "maxsize": 5242880, //5MB
                    "maxFiles": 5,
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
                    "level": 'info',
                    "handleExceptions": true,
                    "json": false,
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
            "levels": config.levels,
            "colors": config.colors
        })
    };
};