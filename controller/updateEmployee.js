var Express = require('express');
var router = Express.Router();
var commonMethod = require("../common/commonMethod");
var config = require('../config/static');
var models = require("../model");

router.put("/:requiredData", function(request, response) {
    var result = {},
        errors;
    try {
        result = config.defaultResult; //Setting Default Result as false
        if (config.enumData.employeeArea.indexOf(request.params.requiredData) === -1) {
            throw "Bad Parameter Conntact to administrator"; //Generating Error While not Finding param in array
        } else {
          models.User.User.findEngineerID(request.query.engineerID, function(err, data) {
            // [config.enumData.schemaNames[request.params.requiredData]]
              if (err) {
                throw err;
              }
              if (data.length!==0)
              {
                //Createing New Entry
                request.check(config.validationSchema.employeeDataPut);
                request.getValidationResult().then(function(isValid) {
                    try {
                        if (!isValid.isEmpty()) {
                            errors = request.validationErrors(); // isValid = isValid.useFirstErrorOnly();
                            throw errors[0].msg;
                        }
                        result.status = true;
                        result.message = "Successfully update";
                        var updateData = request.body;
                        response.send(result);
                    } catch (e) {
                        if (!config.checkSystemErrors(e)) {
                            result.message = e;
                        }
                        response.send(result);
                    }
                });
              }else {
                result.status = false;
                result.message = "No such engineerID contact to administrator";
                response.send(result);
              }
            });


        }
    } catch (e) {
      console.log(e);
        if (!config.checkSystemErrors(e)) {
            result.message = e;
        }
        response.status(401).send(result);
    } finally {
        response.on("finish", function() {
            for (var i in result) {
                if (i !== "status" || i !== "message")
                    delete result[i]; //Deleting Rest of Garbage data
            }
            //   result1 = {};
            //
            // result1 = undefined;
            // employeeArea = undefined;
            console.log("finish");
        });
    }

});

module.exports = router;
