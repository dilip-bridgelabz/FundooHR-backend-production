#!/usr/bin/env node
/**
 * FundooHR-Backend
 *
 * @author  Dilip <dilip.more@bridgelabz.com>
 * @license ISC Licensed
 * @version 1.0
 *
 * Copyright(c) 2017 Bridgelabz <admin@bridgelabz.com>
 */
;
'use strict';

/*
 * Module dependencies
 */
var fs = require("fs"),
    http = require('http'),
    path = require('path'),
    cors = require('cors'),
    join = require('path').join,
    express = require('express'),
    jwt = require('jsonwebtoken'),
    passport = require('passport'),
    colors = require('colors/safe'),
    debug = require('debug')('njs'),
    dateFormat = require('dateformat'),
    session = require('cookie-session'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    cookieParser = require('cookie-parser'),
    swagger = require("swagger-node-express"),
    argv = require('minimist')(process.argv.slice(2)),
    expressValidator = require('express-validator'),
    LocalStrategy = require('passport-local').Strategy,
    config = require('./config/index').set(process.env.NODE_ENV),
    db = require('./config/database/')(config);
    model = require('./model/').init(config);

/**
 * @description Winston Logger derived from the config
 */
var logger = config.logger;

var app = express(); // console.log(app.get('env'));
app.set('database', config.database);
app.set('port', config.port);
app.set('host', config.host);

app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(session({
    keys: ['secretkey1', 'secretkey2', '...']
}));
app.set('view cache', true); //Which ever template engine you use, always ensure the view cache is enabled:

// Configure passport middleware
//app.use(express.methodOverride());
app.use(passport.initialize());
app.use(passport.session());
// Configure passport-local to use account model for authentication
// passport.use(new LocalStrategy(User.User.authenticate()));
// passport.serializeUser(User.User.serializeUser());
// passport.deserializeUser(User.User.deserializeUser());
app.use(expressValidator());

app.use(require("./controller/index"));
//require(__dirname +'/routes/routes')(app, passport);

app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * @description Loading the tools, libraries required only in dev & local & not in production
 */
if (app.get('env') !== 'production') {
    require('./lib/')(app);
}
app.all('*', function(req, res) {
    throw new Error("Bad request");
});
app.use(function(e, request, response, next) {
    if (e.message === "Bad request") {
        var error = {
            status: false,
            error: {
                message: e.message,
                stack: e.stack
            }
        }
        logger.error(error);
        response.status(404).json({
            status: false,
            error: {
                msg: e.message
            }
        });
    }
});

// process.on('uncaughtException', function (error) {
//    console.log(error.stack);
// });
/**
 * Launch server
 */
app.listen(app.get('port'), function() {
    logger.log('info','Express server listening on port ' + app.get('port'));
    console.log('Express server listening on port ' + app.get('port'));
});
