var Express = require('express');
var router = Express.Router();
var commonMethod = require("../common/commonMethod");
var deriveDataEvent = require("../common/events");
var config = require('../config/static');

var count = 0;
router.get("/:requiredData", function(request, response) {
    console.log(JSON.stringify(request.params));
    var resultData = {},
        errors;
    try {
        resultData = config.defaultResult; //Setting Default Result as false
        var employeeArea = request.params.requiredData;
        if (config.enumData.employeeArea.indexOf(employeeArea) === -1) {
            throw "Bad Parameter Conntact to administrator"; //Generating Error While not Finding param in array
            return;
        } else {
            console.log(count);

            // if (typeof config.validationSchema.employeeData != undefined) {
            request.check(config.validationSchema.employeeData);
            var promisValidator = request.getValidationResult();
            promisValidator.then(function(result) {
                result.throw();
                if (!result.isEmpty()) {
                    errors = request.validationErrors(); // isValid = isValid.useFirstErrorOnly();
                    //throw errors[0].msg;
                }
                resultData.status = true;
                resultData.message = "Successfully Generated";
                resultData[employeeArea] = {
                    "data": "data"
                };
                //var updateData = request.body;
                response.send(resultData);
                return;
            }).catch(function(error) { // (B)
                if (!config.checkSystemErrors(e)) {
                    resultData.message = e;
                }
                response.status(401).json(resultData);
                return;
            });
        }
    } catch (e) {
        console.log(e);
        if (!config.checkSystemErrors(e)) {
            resultData.message = e;
        }
        console.log(JSON.stringify(resultData));
        response.status(401).json(resultData);
        return;
    }

});

module.exports = router;