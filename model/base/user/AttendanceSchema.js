/*
 * Base Attendance Schema
 * @path models/base/user/AttendanceSchema.js
 * @file AttendanceSchema.js
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
 * @schema BaseUserAttendancesSchema
 * @description Attendance details
 */
var BaseUserAttendancesSchema = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
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
    // ,
    // holiday: {
    //     type: ObjectId,
    //     ref: HolidaySchema
    // }
});

/**
 * Expose `BaseUserAttendance` Model
 */
module.exports = {
    BaseUserAttendance: mongoose.model('BaseUserAttendance', BaseUserAttendancesSchema)
};