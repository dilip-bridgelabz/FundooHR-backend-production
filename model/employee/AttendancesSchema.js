/*
 * Employee Attendance Schema
 * @path model/employee/AttendancesSchema.js
 * @file AttendancesSchema.js
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
 * @schema AttendancesSchema
 * @description Attendance details
 */
var AttendancesSchema = new Schema({
    employeeID: {
        type: String,
        unique: true,
        required: true
    },
    attendanceDate: {
        type: Date,
        required: true
    },
    isPresent: {
        type: Boolean,
        trim: true
    },
    inTime: {
        type: Date,
        trim: true
    },
    outTime: {
        type: Date,
        trim: true
    },
    reason: {
        type: String,
        trim: true
    }
});

/**
 * Expose `Attendance` Model
 */
module.exports = mongoose.model('Attendance', AttendancesSchema);