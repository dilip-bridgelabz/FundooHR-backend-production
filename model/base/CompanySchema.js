/*
 * Company Schema
 * @path model/base/CompanySchema.js
 * @file CompanySchema.js
 */
'use strict';

/*
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * @schema CompanySchema
 * @description Company details 
 */
var CompanySchema = new Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    contactName: {
        type: String,
        trim: true
    },
    contactNumber: {
        type: String,
        trim: true
    },
    contactEmailAddress: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    }
});

/**
 * Expose `Company` Model
 */
module.exports = mongoose.model('Company', CompanySchema);