/*
 * Employee HR Details Schema
 * @path model/employee/HRSchema.js
 * @file HRSchema.js
 */
'use strict';

/*
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    BaseSchema = require('../base/').Base;

var ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * @description Defining ENUMs for the Program field which will use for validation.
 */
var PROGRAM = ',BRIDGE_CORE,BRIDGE_IT,BRIDGELABZ'.split(',');

/**
 * @description Defining ENUMs for the Tech stack field which will use for validation.
 */
var TECH_STACK = ',Andriod,Angular,iOS,Java'.split(',');

/**
 * @description Defining ENUMs for the Tech stack field which will use for validation.
 */
var CONTRACT_STATUS = ',TO_BEGIN,IN_PROGRESS,COMPLETE'.split(',');

/**
 * @description Defining ENUMs for the Tech stack field which will use for validation.
 */
var EMPLOYEE_TYPE = ',TRANSFERRED,CONTRACT,TERMINATED'.split(',');

/**
 * @schema HRSchema
 * @description Employee HR related Details
 */
var HRSchema = { // EmployeeTracking
    employeeID: {
        type: String,
        unique: true,
        required: true
    },
    hiringCity: {
        type: String,
        trim: true
    },
    currentProgramAssignment: {
        type: String,
        enum: PROGRAM,
        default: ''
    },
    programCurrentStatus: { // Current Weekly Assessment only
        type: String
    },
    programLag: {
        type: String
    },
    fellowshipTechAssignment: {
        type: String,
        enum: TECH_STACK,
        default: ''
    },
    currentContractAssignment: String,
    contractBookingFee: String,
    contractMonthlyFee: String,
    contractTransferFee: String,
    contractCity: String,
    plannedStartDate: {
        type: Date
    },
    contractStatus: {
        type: String,
        enum: CONTRACT_STATUS,
        default: ''
    },
    employeeTracking: [{ // Contract / Permanent :  2 cases can be handeled here. Contract employee vs Salaried Permanent Employee. Also in contract employee contract can be initiateted more than once. 
        employeeType: {
            type: String,
            enum: EMPLOYEE_TYPE,
            default: ""
        },
        initiateOn: {
            type: Date
        },
        signedOn: {
            type: Date
        },
        assignment: String, //{ //department: { Android, MEAN
        client: { // It will be null for everything except contract
            type: String
        },
        contractMonthlyFee: {
            type: String
        },
        contractTransferFee: {
            type: String
        },
        contractCity: {
            type: String
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

module.exports = mongoose.model('HR', HRSchema);