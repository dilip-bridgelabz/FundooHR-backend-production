/**
 *
 */
"use strict";

/**
 *Module dependencies
 */
var
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt-nodejs'),
    Model = require("../model/"),
    config = require('../config/').config,
    logger = config.logger;

var User = Model.Employee.User.User;
/**
 *Module variables
 */
var host = config.host;

/**
 *Configuration and Settings
 */
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        if (err) {
            console.error('There was an error accessing the records of' +
                ' user with id: ' + id);
            return done(err);
        }
        return done(null, user);
    })
});

/**
 * @description Local Strategy
 */
passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(request, username, password, done) {
        process.nextTick(function() {
            if (!request.user) {
                User.findOne({'employee': username }, function(err, user) {
                    if (err) {
                        console.error(err);
                        return done(err);
                    }
                    if (user) {
                        return done(null, false, { message: 'Username/EmailAddress already exists' });
                    } else {
                        var newUser = new User();
                        newUser.employee = request.body.username;
                        newUser.password = newUser.generateHash(password);
                        newUser.emailAddress = request.body.username;
                        newUser.firstName = request.body.firstName || '';
                        newUser.lastName = request.body.lastName || '';
                        newUser.gender = (request.body.gender) ? request.body.gender.toUpperCase() : '';
                        newUser.phone = request.body.phone || '';
                        newUser.engineerID = request.body.engineerID || '';
                        newUser.engineerType = ((request.body.engineerType) ? request.body.engineerType.toUpperCase() : '') || '';
                        console.log(newUser);
                        newUser.save(function(error) {
                            if (error) {
                                var message;
                                console.log(error);
                                if (error.name == 'ValidationError') {
                                    for (var field in error.errors) {
                                        if (error.errors[field].kind == 'enum') {
                                            if (typeof error.errors[field].message !== undefined)
                                                throw error.errors[field].message;
                                            message = 'Invalid ' + error.errors[field].path + '. Please select a valid value';
                                        } else if (error.errors[field].kind == 'Duplicate value') {
                                            message = 'A user with the given ' + error.errors[field].path + ' is already registered';
                                        } else if (error.errors[field].kind == 'required') {
                                            message = 'A user must have ' + error.errors[field].path + '. Please enter select/enter some value.';
                                        }
                                    }
                                } else if (error.name == 'UserExistsError') {
                                    message = 'A user with the given Username is already registered';
                                }
                                return done(null, false, { message: message });
                            }
                            return done(null, newUser);
                        });
                    }
                });
            }
        });
    }));

passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
        badRequestMessage: 'Username, Password is blank. No Username & Password sent.'
    },
    function(req, username, password, done) {
        User.findOne({'employee': username }, function(err, user) {
            if (err) {
                console.log(err.message == "Missing credentials");
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Username doesn\'t exists' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { "message": 'Invalid password try again' });
            }
            return done(null, user);
        });
    }));


/**
 *Export Module
 */
module.exports = passport;
