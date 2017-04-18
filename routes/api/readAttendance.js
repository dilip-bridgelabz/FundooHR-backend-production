/*
 * Employee Attendance marker
 * @path routes/api/doAttendance.js
 * @file doAttendance.js
 * @Scripted by Hamid Raza Noori
 */
'use strict';

/*
 * Module dependencies
 */
var attendance = require("../../model").Employee.Attendance;
var config = require('../../config/static');

// var express = require("express");
// var route = express.Router();


module.exports = function(req, res) {
  var result = {};
  result.status = false;
  try {
    req.check(config.validationSchema.readAttendance);
    req.getValidationResult().then(function(isValid) {
      try {
        if (!isValid.isEmpty()) {
          var errors = req.validationErrors(); // isValid = isValid.useFirstErrorOnly();
          throw errors[0].msg;
        }
        var attendanceData = req.query;
        var date = new Date(attendanceData.date);
        attendanceData.startDate = new Date(date.getFullYear(), date.getMonth(), 1);
        attendanceData.endDate= new Date(date.getFullYear(), date.getMonth() + 1, 0);

        attendance.readAttendance(attendanceData,function (err,attendanceBundle) {
          if (err) {
            throw err;
          }
          result.status = true;
          result.message = "Successfully Generated";
          result.attendanceData = attendanceBundle;
          res.send(result);
        });
      } catch (e) {
        if (!config.checkSystemErrors(e)) {
          result.status = false;
          result.message = e;
        }
        res.status(401).send(result);
        return;
      }
    });
  } catch (e) {
    res.send({
      "status": false,
      "message": "Do Attendance"
    });
  }
};
