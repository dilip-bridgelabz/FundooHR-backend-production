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
        required: true
    },
    attendanceDate: {
        type: Date,
        required: true
    },
    isPresent: {
        type: Boolean,
        trim: true,
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
},{toJSON:{virtuals: true}});
AttendancesSchema.set('toJSON', {
    transform:function (doc,ret,field) {
      ret.a_id=ret._id;
      ret.attendanceDate=ret.attendanceDate.toString("YYYY/MM/DD");
      ret.inTime=timeFormat(ret.inTime);
      ret.outTime=timeFormat(ret.outTime);
      delete ret._id;
      delete ret.__v;
      return ret;
    }
});

function timeFormat(dt) {
      return (dt.getHours()>11?(dt.getHours()%12):(dt.getHours()))+":"+dt.getMinutes()+" "+(dt.getHours()>11?"pm":"am");
}
/***
*@Method doAttendance
*@description Statics Method To create Attendance
***/
AttendancesSchema.statics.doAttendance = function (attendanceData,callback) {
  var self =this;
  var attendanceObj = new self(attendanceData);
  attendanceObj.save(callback);
};

/***
*@Method updateAttendance
*@description Statics Method To update Attendance
***/
AttendancesSchema.statics.updateAttendance = function (attendanceData,callback) {
  var employeeID = attendanceData.employeeID;
  delete attendanceData.employeeID;
  this.findOneAndUpdate({employeeID:employeeID},attendanceData, callback);
};

/***
*@Method readAttendance
*@description Statics Method To read Attendance
***/
AttendancesSchema.statics.readAttendance = function (attendanceData,callback) {
  this.find({employeeID:attendanceData.employeeID,attendanceDate:{$gte:attendanceData.startDate,$lte:attendanceData.endDate}}, callback);
};

/***
*@Method isUserMarked
*@description Statics Method To check User is Marked or not
***/
AttendancesSchema.statics.isUserMarked = function (attendanceData,callback) {
  this.findOne({employeeID:attendanceData.employeeID,attendanceDate:attendanceData.attendanceDate},callback);
};
/**
 * Expose `Attendance` Model
 */
module.exports = mongoose.model('Attendance', AttendancesSchema);
