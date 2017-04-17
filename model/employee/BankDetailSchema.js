/*
 * Employee Bank Schema
 * @path model/employee/BankDetailSchema.js
 * @file BankDetailSchema.js
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
 * @schema BankDetailSchema
 * @description Employee Bank details of user
 */
var BankDetailSchema = new Schema({
    employeeID: {
        type: String,
        unique: true,
        required: true
    },
    accountNumber: {
        type: String,
        required: true
    },
    ifscCode: {
        type: String,
        trim: true
    },
    panNumber: {
        type: String,
        trim: true
    },
    payStipend: {
        type: String,
        trim: true
    },
    ammount: {
        type: Number,
        trim: true
    },
    bankName: {
        type: String,
        trim: true,
        required: true
    },
    reason: {
        type: String,
        trim: true
    },
    bankVerified: {
        type: Boolean
    }
});

/**
 * Expose `BankDetail` Model
 */

module.exports = mongoose.model('BankDetail', BankDetailSchema);