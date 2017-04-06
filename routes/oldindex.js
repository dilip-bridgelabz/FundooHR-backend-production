/**
 *  Main controller file.
 */

"use strict";

var express = require("express"),
    config = require('../config/'),
    validator = require('../config/static/'),
    commonMethod = require("../common/commonMethod"),
    logger = config.config.logger,
    router = express.Router({
        caseSensitive: true
    }),
    passport = require("passport"),
    User = require("../model/userSchema").User;


router.post('/ServieLoginAuth', function(request, response, next) {
    passport.authenticate("local-login", function(err, user, info) {
        var result = {};
        if (err) {
            console.log(err);
            return next(err);
        }
        if (!user) {
            result.status = false;
            result.message = info.message;
            return response.status(401).json(result);
        }
        var token = commonMethod.generateToken(request.body.emailAddress);
        result.status = true;
        // result.message = info.message;
        return response.send(result);
    })(request, response, next);
});


router.post("/ServiceSignupAuth", function(request, response, next) {
    try {
        var result, errors;
        request.filter();
        request.check(validator.validationSchema.signup);
        result = validator.defaultResult;
    } catch (e) {
        var result = {};
        result.status = false;
        result.message = "Something bad happened. Please contact system Administrator.";
        console.error(e);
        response.status(401).json(result);
    };
    request.getValidationResult().then(function(isValid) {
        try {
            if (!isValid.isEmpty()) {
                errors = request.validationErrors(); // isValid = isValid.useFirstErrorOnly();
                console.error(errors[0].msg);
                throw errors[0].msg;
            }
            var newUser = new User({
                username: request.body.emailAddress,
                password: request.body.password,
                emailAddress: request.body.emailAddress,
                firstName: request.body.firstName || '',
                lastName: request.body.lastName || '',
                gender: (request.body.gender) ? request.body.gender.toUpperCase() : '',
                phone: request.body.phone || '',
                engineerID: request.body.engineerID || '',
                engineerType: ((request.body.engineerType) ? request.body.engineerType.toUpperCase() : '') || '',
            });
            User.register(newUser, request.body.password, function(error, data) {
                try {
                    if (error) {
                        console.log(JSON.stringify(error));
                        if (error.name == 'ValidationError') {
                            for (var field in error.errors) {
                                if (error.errors[field].kind == 'enum') {
                                    if (typeof error.errors[field].message !== undefined)
                                        throw error.errors[field].message;
                                    throw 'Invalid ' + error.errors[field].path + '. Please select a valid value';
                                } else if (error.errors[field].kind == 'Duplicate value') {
                                    throw 'A user with the given ' + error.errors[field].path + ' is already registered';
                                } else if (error.errors[field].kind == 'required') {
                                    throw 'A user must have ' + error.errors[field].path + '. Please enter select/enter some value.';
                                }
                            }
                        } else if (error.name == 'UserExistsError') {
                            throw 'A user with the given Username is already registered';
                        }
                        throw new Error(error);
                    }
                    var token = commonMethod.generateToken(request.body.emailAddress);
                    console.log(token);
                    result.status = true;
                    result.message = "User registered successfully";
                    // passport.authenticate("local-login", {
                    //     successRedirect: "/dashboard",
                    //     failureRedirect: "/error",
                    // })(request, response);
                    response.send(result);
                } catch (e) {
                    if (!validator.checkSystemErrors(e)) {
                        result.message = e;
                    }
                    console.error(e);
                    response.status(401).json(result);
                };
            });
        } catch (e) {
            if (!validator.checkSystemErrors(e)) {
                result.message = e;
            }
            console.error(e);
            response.status(401).json(result);
        };
    });
});

module.exports = router;
/********************** Authentication [END] **********************/

/********************** Helper [START] **********************/
/**
 * [Checks if a user is logged in]
 * @method isLoggedIn
 * @param  {[type]}   req  [Request]
 * @param  {[type]}   res  [Response]
 * @param  {Function} next [Callback]
 * @return {Boolean}  [returns true if the user is logged in]
 */
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect("/login");
}
/********************** Helper [START] **********************/

module.exports = router;