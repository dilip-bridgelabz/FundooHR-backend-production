/*
 * Base User Bank Schema
 * @path models/base/user/BankSchema.js
 * @file BankSchema.js
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
 * @schema  BaseUserBankDetailsSchema
 * @description User Bank details of user
 */
var BaseUserBankDetailsSchema = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        unique: true,
        required: true
    },
    accountNumber: {
        type: String,
        required: true
    },
    bankName: {
        type: String,
        trim: true,
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
    isSalaried: {
        type: Boolean,
        trim: true
    },
    reason: {
        type: String,
        trim: true
    }
});

/**
 * Expose `BaseUserBankDetails` Model
 */
module.exports = mongoose.model('BaseUserBankDetail', BaseUserBankDetailsSchema);