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
    express = require('express'),
    jwt = require('jsonwebtoken'),
    passport = require('passport'),
    dateFormat = require('dateformat'),
    cookieSession = require('cookie-session'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    cookieParser = require('cookie-parser'),
    swagger = require("swagger-node-express"),
    //argv = require('minimist')(process.argv.slice(2)),
    expressValidator = require('express-validator'),
    config = require('./config/').set(process.env.NODE_ENV),
    db = require('./config/database/')(config),
    modelInit = require('./model/').init(config),
    model = require('./model/'),
    helmet = require("helmet"),
    router = require('./routes/'),
    session = require("express-session"),
    lusca = require("lusca");


/**
 * @description Winston Logger derived from the config
 */
var logger = config.logger;

// logger.log("info", "config details : \n" + JSON.stringify(luscaOps));
var app = express(); // console.log(app.get('env'));

app.use(helmet());
app.use(compression({ threshold: 9 }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(session({
    secret: "s3cr3t",
    resave: true,
    saveUninitialized: true
}));
app.use(expressValidator());
// app.use(session({
//     resave: true,
//     saveUninitialized: true,
//     secret: process.env.SESSION_SECRET,
//     store: new MongoStore({
//         url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
//         autoReconnect: true,
//         clear_interval: 3600
//     })
// }));

require("./lib")(app);
//(app);
// app.use(swagger);
// app.use(express.static('dist'));
// swagger.setAppHandler(subpath);
// swagger.setApiInfo({
//     title: "Fundoo HR API",
//     description: "",
//     termsOfServiceUrl: "",
//     contact: "admin@bridgelabz.com",
//     license: "",
//     licenseUrl: ""
// });
// subpath.get('/', function (req, res) {
//     res.sendfile(__dirname + '/lib/index.html');
// });
//
// swagger.configureSwaggerPaths('', 'api-docs', '');
//
// swagger.configure(applicationUrl, '1.0.0');
var userRoutes = require('./routes/');

/**
 * @description Routes
 */
app.use('/api', userRoutes);


/**
 * Launch server
 */
app.listen(config.port, function() {
    logger.log('info', 'Express server listening on port ' + config.port);
    console.log('Express server listening on port ' + config.port);
});
