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
        req.check(config.validationSchema.attendance);
        req.getValidationResult().then(function(isValid) {
            try {
                if (!isValid.isEmpty()) {
                    var errors = req.validationErrors(); // isValid = isValid.useFirstErrorOnly();
                    throw errors[0].msg;
                }
                var attendanceData = req.body;
                attendance.isUserMarked(req.body,function (err,isAttend) {
                  try {
                  if (err) {
                    throw err;
                  }
                  var attendanceType;
                  (isAttend!==null?attendanceType ="updateAttendance":attendanceType="doAttendance");
                //  throw "User Already marked";

                attendanceData.attendanceDate = new Date(req.body.attendanceDate);
                if (attendanceData.isPresent === "true"||((typeof attendanceData.isPresent==="string")?false:attendanceData.isPresent)) {
                    attendanceData.inTime = parseTime(req.body.inTime);   //Binding In Date Object
                    attendanceData.outTime = parseTime(req.body.outTime); //Binding In Date Object
                    var InOutTimeDiff = attendanceData.outTime - attendanceData.inTime;
                    var dateDiff = attendanceData.inTime - attendanceData.attendanceDate;
                    if (InOutTimeDiff < 0 && InOutTimeDiff > 72000000) {
                      throw "Invalid Time, Please Check inTime and outTime";
                    }
                  }else {
                    attendanceData.inTime = null;
                    attendanceData.outTime = null;
                  }
                  //Dynamic Attendace Based on Entry Of Atteandance
                    attendance[attendanceType](attendanceData,function (err,data) {
                    if (err) {
                      throw err;
                    }
                    res.send({
                        "status": true,
                        "message": "Attendance Successfully Marked"
                    });
                  });

              } catch (e) {
                result.message="Server Issue Please to administrator";
                if (!config.checkSystemErrors(e)) {
                    result.status = false;
                    result.message = e;
                }
                res.status(401).send(result);
                return;
              }
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

/**
 * @Method parseTime
 * @description  Method to parse Time and get Propare Date Object
 */

function parseTime(timeStr, dt) {
    if (!dt) {
        dt = new Date();
    }

    var time = timeStr.match(/(\d+)(?::(\d\d))?\s*(p?)/i);
    if (!time) {
        return NaN;
    }
    var hours = parseInt(time[1], 10);
    if (hours == 12 && !time[3]) {
        hours = 0;
    }
    else {
        hours += (hours < 12 && time[3]) ? 12 : 0;
    }
    dt.setHours(hours);
    dt.setMinutes(parseInt(time[2], 10) || 0);
    dt.setSeconds(0, 0);
    return dt;
}
