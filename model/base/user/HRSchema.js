/*
 * User HR Details Schema
 * @path models/userHRDetailsSchema.js
 * @file userHRDetailsSchema.js
 */
'use strict';

/*
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('./Schema').BaseUser;

var ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * @schema BaseHRSchema
 * @description User HR related Details
 */
var BaseUserHRSchema = {
    employee: {
        type: ObjectId,
        ref: 'User',
        unique: true,
        required: true
    },
    hiringCity: {
        type: String,
        trim: true
    },
    programTracking: {
        type: ObjectId,
        ref: 'Program'
    },
    programCurrentStatus: { // Current Weekly Assessment only
        type: ObjectId,
        ref: 'BaseUserTracking'
    },
    fellowshipTechAssignment: String,
    contractCompanyAssignment: String,
    employeeStatus: [{ // Contract / Permanent :  2 cases can be handeled here. Contract employee vs Salaried Permanent Employee. Also in contract employee contract can be initiateted more than once. 
        client: { // It will be null for everything except contract
            type: ObjectId,
            ref: 'Client'
        },
        employeeType: String,
        assignment: String, //{ //department: { Android, MEAN
        initiateOn: {
            type: Date
        },
        signedOn: {
            type: Date
        },
        estStartDate: {
            type: Date,
            trim: true,
        },
        startDate: {
            type: Date,
            trim: true,
        },
        endDate: {
            type: Date,
            required: false
        }
    }]

};

module.exports = mongoose.model('BaseUserHR', BaseUserHRSchema); //mongoose.model('BaseHR', BaseHRSchema, 'collectionBaseHR');