var attendance = require("../../model/attendanceSchema").BaseUserAttendance;
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
                    errors = req.validationErrors(); // isValid = isValid.useFirstErrorOnly();
                    throw errors[0].msg;
                }
                result.status = true;
                result.message = "Successfully Generated";
                var attendanceData = req.body;
                attendance.isUserMarked(req.body,function (err,isAttend) {
                  try {
                  if (err) {
                    throw err;
                  }
                  console.log("isAttend",isAttend);
                  if(isAttend!==null)
                  throw "User Already marked";

                attendanceData.attendanceDate = new Date(req.body.attendanceDate);
                if (attendanceData.inTime !== undefined) {
                    attendanceData.inTime = new Date(req.body.inTime);
                    attendanceData.outTime = new Date(req.body.outTime);
                    var InOutTimeDiff = attendanceData.outTime - attendanceData.inTime;
                    var dateDiff = attendanceData.inTime - attendanceData.attendanceDate;
                    if ((InOutTimeDiff > 0 && InOutTimeDiff < 72000000) && dateDiff < 72000000) {
                      attendance.doAttendance(attendanceData,function (err,data) {
                      if (err) {
                        throw err;
                      }
                      res.send({
                          "status": true,
                          "message": "Do Attendance"
                      });
                      });
                    } else {
                        res.send({
                            "status": false,
                            "message": "Not valid Date Attendance"
                        });
                    }
                } else {
                  if (attendanceData.reason) {
                    attendance.doAttendance(attendanceData,function (err,data) {
                    if (err) {
                      throw err;
                    }
                    res.send({
                        "status": true,
                        "message": "Do With Leave Attendance"
                    });
                    });
                  }else {
                    res.send({
                        "status": false,
                        "message": "Reason Field Can't be empty"
                    });
                  }
                }

              } catch (e) {
                console.log(e);
                if (!config.checkSystemErrors(e)) {
                    result.status = false;
                    result.message = e;
                }
                res.status(401).send(result);
                return;
              }
              });

            } catch (e) {
              console.log(e);
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
