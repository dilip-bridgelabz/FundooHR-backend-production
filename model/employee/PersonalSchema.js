/*
 * Employee User Personal Schema
 * @path model/employee/PersonalSchema.js
 * @file PersonalSchema.js
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
 * @description Defining ENUMs for the relation type field which will use for validation.
 */
var relationType = 'FATHER,MOTHER,SON,DAUGHTER,SPOUSE,GRANDFATHER,GRANDMOTHER,GREAT-GRANDFATHER,GREAT-GRANDMOTHER,AUNT,UNCLE,COUSIN'.split(',')

/**
 * @schema PersonalSchema
 * @description Personal Details of the employee
 */
var PersonalSchema = new Schema({
    employeeID: {
        type: String,
        unique: true,
        required: true
    },
    dob: {
        type: Date,
        trim: true
    },
    employeeRelative: { //engineerRelative
        name: {
            type: String
        },
        relationAs: {
            type: String,
            enum: relationType,
            default: 'FATHER'
        },
        contact: {
            type: String,
            required: false
        },
        occupation: {
            type: String,
            required: false
        },
        relativeAnnualSalary: {
            type: String,
            trim: false
        }
    },
    address: {
        type: String,
        trim: true
    },
    permanentAddress: {
        type: String,
        trim: true
    }
});

/**
 * Expose `PersonalSchema` Model
 */
module.exports = mongoose.model('Personal', PersonalSchema);