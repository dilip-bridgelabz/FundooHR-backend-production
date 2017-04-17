/*
 * Base User Personal Schema
 * @path model/base/user/PersonalSchema.js
 * @file PersonalSchema.js
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
 * @description Defining ENUMs for the relation type field which will use for validation.
 */
var relationType = 'FATHER,MOTHER,SON,DAUGHTER,SPOUSE,GRANDFATHER,GRANDMOTHER,GREAT-GRANDFATHER,GREAT-GRANDMOTHER,AUNT,UNCLE,COUSIN'.split(',')

/**
 * @schema BaseUserPersonalSchema
 * @description Personal Details of the User
 */
var BaseUserPersonalSchema = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
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
 * Expose `BaseUserPersonal` Model
 */
module.exports = mongoose.model('BaseUserPersonal', BaseUserPersonalSchema);