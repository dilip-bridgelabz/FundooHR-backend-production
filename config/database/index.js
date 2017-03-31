#!/usr/bin/env node

/**
 * fundooHR-Backend Swagger API
 * @author  Dilip <dilip.more@bridgelabz.com>
 * @license ICS
 * @version 1.0
 */
'use strict';

/*
 * Module dependencies
 */
module.exports = function(config) {
    if (typeof config.mongodb !== undefined) {
        return require('./mongodb').init(config);
    } else {
        logger.error("Database configuration for mongodb not set");
    }
};
