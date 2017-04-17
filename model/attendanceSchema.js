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
    Schema = mongoose.Schema;
    // User = require('./Schema').BaseUser;

var ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * @schema BaseUserAttendanceSchema
 * @description Attendance details
 */
var BaseUserAttendanceSchema = Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    attendanceDate: {
        type: Date,
        required: true
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
BaseUserAttendanceSchema.statics.doAttendance = function (attendanceData,callback) {
  var self =this;
  var attendanceObj = new self(attendanceData);
  attendanceObj.save(callback);
};
BaseUserAttendanceSchema.statics.isUserMarked = function (attendanceData,callback) {
  attendanceData.attendanceDate=(new Date(attendanceData.attendanceDate));
  var self =this;
  self.findOne({user:attendanceData.user,attendanceDate:attendanceData.attendanceDate},callback);
};

/**
 * Expose `BaseUserAttendance` Model
 */
module.exports = {
    BaseUserAttendance: mongoose.model('BaseUserAttendance', BaseUserAttendanceSchema)
};
