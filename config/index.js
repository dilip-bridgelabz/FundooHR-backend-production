/**
 * index.js
 *
 * Index Configuration setup is required to run your server.
 *
 * @author  Dilip <dilip.more@bridgelabz.com>
 * @license ICS
 * @version 1.0
 */
;
var winston = require('winston'),
    clc = require('cli-color'),
    dateFormat = require('dateformat'),
    fse = require("fs-extra"),
    fs = require("fs"),
    config;

winston.emitErrs = true;

/**
 * @description winston logging config
 */
var winstonConfig = {
    config: {
        levels: {
            error: 0,
            warn: 1,
            info: 2,
            debug: 3,
            trace: 4,
            data: 5,
            verbose: 6,
            silly: 7
        },
        colors: {
            error: 'red',
            warn: 'yellow',
            info: 'green',
            debug: 'cyan',
            trace: 'grey',
            data: 'magenta',
            verbose: 'cyan',
            silly: 'magenta'
        }
    },
    logDir: "logs"
};

var loadLocalConfig = require('./local')(winstonConfig),
    loadProductionConfig = require('./production')(winstonConfig),
    loadDevelopmentConfig = require('./development')(winstonConfig);

/**
 * @description LUSCA Express application security hardening.
 */
var luscaOps = {
    csrf: false,
    xframe: 'SAMEORIGIN',
    p3p: 'ABCDEF',
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    },
    xssProtection: true,
    nosniff: true
};

/**
 * @description Creates the log directory if it doesnt exists.
 */
if (!fs.existsSync(winstonConfig.logDir)) {
    // Create the directory if it does not exist
    fs.mkdirSync(winstonConfig.logDir);
} else {
    fse.emptyDir(winstonConfig.logDir, function(err) {
        if (err) {
            console.log(err);
        }
    });
}

/**
 * @description Defines the color for console
 */
var consoleColorMap = {
    "log": clc.blue,
    "warn": clc.yellow,
    "error": clc.red.bold,
    "info": clc.cyan
};

/**
 * Apply the console color to the actual consoles
 * @description Adds the timestamp & colors to the console function
 */
["log", "warn", "error", "info"].forEach(function(method) {
    var oldMethod = console[method].bind(console);
    console[method] = function() {
        var res = [];
        for (var x in arguments) {
            if (arguments.hasOwnProperty(x))
                res.push(arguments[x]);
        }
        oldMethod.apply(
            console, [consoleColorMap[method](dateFormat(new Date(), "ddd, mmm d yyyy h:MM:ss TT Z")), consoleColorMap[method](method), ':']
            .concat(consoleColorMap[method](res.join(" ")))
        );
    };
});

/**
 * @description Combine all the require config files.
 *
 */
var envConfig = {
    "production": loadProductionConfig,
    "development": loadDevelopmentConfig,
    "local": loadLocalConfig
}

/**
 * 
 */
var luscaSecurity = function() {
    config.security.config = luscaOps;
}

/**
 * @description It return true if the current system is production
 * @param {*} config
 */
var isProduction = function(config) {
    return config.name == 'production';
}

/**
 * @description Return the domain URI
 * @param {*} that is configuration
 */
var getDomainURL = function(that) {
    this.host = that.config.host;
    this.port = that.config.port;
    if (isProduction(that.config)) {
        return this.host;
    }
    return this.host + ':' + this.port;
}

/**
 * @exports : Exports the Config Environment based Configuration
 *
 */
module.exports = {
    set: function get(env) {
        if (config == null) {
            this.config = envConfig[env] || envConfig.local;
            this.ename = (this.config.name) ? this.config.name : '';
            this.config.domainURL = getDomainURL(this);
            console.log("Environment Set to:", this.ename);
            config = this.config;
            luscaSecurity();
        }
        return config;
    },
    config
};