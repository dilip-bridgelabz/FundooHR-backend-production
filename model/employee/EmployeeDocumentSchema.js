/*
 * Employee Document
 * @path model/employee/EmployeeDocumentSchema.js
 * @file EmployeeDocumentSchema.js
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
 * @schema EmployeeDocumentSchema
 * @description Employee Document
 */
var EmployeeDocumentSchema = new Schema({
    employeeID: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    documentLink: {
        type: String,
        required: true
    },
    isOriginal: {
        type: Boolean,
        required: true
    },
    submittedDate: {
        type: Date,
        trim: true
    },
    returnedOn: {
        type: String,
        trim: true
    },
    returnedBy: {
        type: String,
        trim: true
    },
    isCouriered: {
        type: Boolean
    },
    referenceNumber: {
        type: String,
        trim: true
    },
    reason: {
        type: String,
        trim: true
    }
});

/**
 * Expose `EmployeeDocument` Model
 */
module.exports = mongoose.model('EmployeeDocument', EmployeeDocumentSchema);