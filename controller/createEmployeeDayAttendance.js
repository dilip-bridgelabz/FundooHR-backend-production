var express = require('express');
var router = express.Router();
var config = require('../config/static');
var attendance = require("../model/attendanceSchema");

router.post("/", function(request, response) {
    var result = {},
        errors;
    try {

        //Attendance Entry
    } catch (e) {
        if (!config.checkSystemErrors(e)) {
            result.status = false;
            result.message = e;
        }
        response.status(401).json(result1);
    }

});

module.exports = router;
