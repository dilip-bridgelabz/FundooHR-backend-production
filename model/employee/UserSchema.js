/*
 * User Schema
 * @path model/employee/UserSchema.js
 * @file UserSchema.js
 */
'use strict';

/*
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    uuid = require("uuid"),
    bcrypt = require('bcrypt-nodejs'), // bcrypt = require('bcryptjs'),
    crypto = require('crypto'),
    jwt = require('jwt-simple'),
    Base = require('../base/base.js'),
    passportLocalMongoose = require('passport-local-mongoose');

/**
 *  Base: Base, // Create the base schema & extend some behavior
    BaseSchema: BaseSchema
 */
var ObjectId = Schema.Types.ObjectId;

/**
 * @description Defining ENUMs for the roles type field which will use for validation.
 */
var roles = 'ADMINISTRATOR,HUMAN RESOURCE,BUSINESS,FINANCE,EMPLOYEE'.split(',');

/**
 * @schema User Schema
 * @description User details
 */
// var UserSchema = new Base.AbstractSchema();
// UserSchema.add({
var UserSchema = new Schema({
    username: { // Earlier username, Update of new implementation - 11th April 2017
        type: String,
        unique: true
    },
    password: String, //123456
    passwordResetToken: String,
    passwordResetExpires: Date,
    emailAddress: {
        type: String,
        trim: true,
        lowercase: true,
        unique: ['A user with same Email Address {VALUE} already exists'],
        required: 'Email address is required'
    },
    employeeID: {
        type: String,
        unique: true
    },
    role: {
        type: String,
        enum: roles,
        default: 'EMPLOYEE'
    },
    isSuperAdmin: {
        type: Boolean,
        trim: true,
        default: false,
        required: false
    },
    lastIPAddress: String
});

// var options = ({ missingPasswordError: "Wrong password" });
// UserSchema.plugin(passportLocalMongoose, options);
// UserSchema.plugin(passportLocalMongoose);

/**
 * JWT `Encode` the password
 *
 * @return {String} token
 * @api public
 */
UserSchema.statics.encode = function(data) {
    return jwt.encode(data, config.tokenSecret);
};

/**
 * JWT `Decode` the password
 *
 * @return {String} token
 * @api public
 */
UserSchema.statics.decode = function(data) {
    return jwt.decode(data, config.tokenSecret);
};

/**
 * Create schema methods
 */
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


String.prototype.lpad = function(padString, length) {
    var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
}

UserSchema.pre("save", true, function(next, done) {
    var self = this;
    var currentDate = new Date;
    if (this.isNew) {
        console.log('Pre-save User Signup hook...');
        var query = User.findOne({ employeeID: { $exists: true } }).sort({ $natural: -1 }).limit(1);
        query.exec(function(error, results) {
            xcounter = 1;
            if (error) {
                console.log(error);
            } else if ( !results || results.length == 0) {
                xcounter = 1;
            } else {
                if (results.employeeID) {
                    var xcounter = results.employeeID.match(/.{1,8}/g);
                    if (typeof xcounter[1] === undefined) {
                        xcounter = 1;
                    } else {
                        xcounter = parseInt(xcounter[1] || 0) + 1;
                    }
                }
            }
            var d = new Date();
            xcounter = xcounter + '';
            while (xcounter.length < 3)
                xcounter = "0" + xcounter;
            self.employeeID = (d.getDate() < 10 ? '0' : '') + d.getDate() + '' + (d.getMonth() + 1 < 10 ? '0' : '') + (d.getMonth() + 1) + d.getFullYear() + xcounter.lpad("0", 3);
            next();
        });
        this.createdAt = currentDate.now;
        this.employeeID = self.employeeID;
        this.updatedAt = currentDate.now;
        console.log(this);
        done();
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = {
    User: User,
    UserSchema: UserSchema
};
