/*
 * User Schema
 * @path model/employee/EmployeeSchema.js
 * @file EmployeeSchema.js
 */
'use strict';

/*
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ObjectId = Schema.Types.ObjectId;

/**
 * @description Defining ENUMs for the gender field which will use for validation.
 */
var genders = ',MALE,FEMALE'.split(',');

/**
 * @description Defining ENUMs for the engineer type field which will use for validation.
 */
var employeeTypes = ',CONTRACT,FELLOWSHIP,PROBATION,EMPLOYMENT,TERMINATED,EX-EMPLOYEE'.split(','); // Will remain as it no change - 14th April 2017 -- Part of new implementation - 11th April 2017 Desc: FELLOWsHIP,CONTRACT,(PROBATION - Company),(EMPLOYMENT - company),(X-EMPLOYMENT- both company & bridgeLabz),CONSULTANT

/**
 * @schema EmployeeSchema
 * @description Employee details
 */
var EmployeeSchema = new Schema({
    employeeID: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        trim: true
    },
    middleName: { // No earlier existance, New implementation - 11th April 2017
        type: String,
        trim: true,
        required: false
    },
    lastName: {
        type: String,
        trim: true,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    altPhone: {
        type: String,
        required: false
    },
    emailAddress: {
        type: String,
        trim: true,
        lowercase: true,
        unique: ['A user with same Email Address {VALUE} already exists'],
        required: 'Email address is required'
    },
    altEmailAddress: {
        type: String,
        trim: true,
        lowercase: true
    },
    employeeType: { // Earlier engineerType, Updated - 11th April 2017
        type: String,
        required: ['Engineer Type is required.'],
        default: 'EMPLOYEE', // No earlier existance, employee is set to default EMPLOYEE type, New implementation - 11th April 2017
        enum: {
            values: employeeTypes,
            message: 'Invalid Engineer Type. Please selecet a valid Engineer Type.'
        }
    },
    gender: {
        type: String,
        required: false
    },
    meta: { // No earlier existance, employee meta may have details which can be added later. New implementation - 11th April 2017
        avatarImg: {
            type: ObjectId,
            ref: 'images',
            required: false
        }
    }
});

/**
 * Find `User` by its email
 *
 * @param {String} email
 * @return {Error} err
 * @return {User} user
 * @api public
 */
EmployeeSchema.methods.findByEmail = function(email, cb) {
    return this.findOne({
            emailAddress: email
        })
        .exec(cb);
}

/**
 * Find `User` by its id
 *
 * @param {String} id
 * @return {Error} err
 * @return {User} user
 * @api public
 */
EmployeeSchema.methods.getUserById = function(id, callback) {
    User.findById(id, callback);
};

/**
 * Find `User` by its username
 *
 * @param {String} username
 * @return {Error} err
 * @return {User} user
 * @api public
 */
EmployeeSchema.methods.getUserByUsername = function(username, callback) {
    var query = {
        username: username
    };
    User.findOne(query, callback);
};

/**
 * Find `User` by its username and Password
 *
 * @param {String} username
 * @param {String} password
 * @return {Error} err
 * @return {User} user
 * @api public
 */
EmployeeSchema.methods.getUserByUsernameAndPassword = function(query, callback) {
    this.findOne(query, callback);
};

/**
 * createUser `User` by newUser Object
 *
 * @param {Object} newUser
 * @return {Error} err
 * @return Void
 * @api public
 */
EmployeeSchema.methods.createUser = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(function(error, data, affected) {
                //console.error(error);
                if (error && error.code !== 11000) {
                    if (error.name == 'ValidationError') {
                        for (var field in error.errors) {
                            return callback(error.errors[field].MongooseError, null);
                        }
                    } else {
                        return callback('Something bad happened. Please contact system administrator', null);
                    }
                }
                //duplicate key
                if (error && error.code === 11000) {
                    //throw new Error('User already registered');

                    //callback('User already registered', null);
                } else {
                    callback(null, data);
                    console.log('Inserted new user');
                }
            });
        });
    });
};

EmployeeSchema.pre('save', function(next) {
    // var user = this;
    // if (!user.isModified('password')) { return next(); }
    // bcrypt.genSalt(10, (err, salt) => {
    //     if (err) { return next(err); }
    //     bcrypt.hash(user.password, salt, null, (err, hash) => {
    //         if (err) { return next(err); }
    //         user.password = hash;
    //         next();
    //     });
    // });
    // var now = new Date().getTime();
    // //this._id = uuid.v1();
    // this.updatedAt = now;
    // if (!this.createdAt) {
    //     this.createdAt = now;
    // }
    next();
});

//var BaseUserModel = Base.BaseModel.discriminator('BaseUser', BaseUserSchema);
var Employee = mongoose.model('Employee', EmployeeSchema);

/**
 *User Model Utility functions
 */
function findBaseUser(req, res, next) {
    return BaseUserModel.findOne({ 'emailAddress': req.params.emailAddress }, 'emailAddress username',
        function(err, user) {
            if (err) {
                return next(err);
            }
            if (user == null) {
                return res.status(404).json('User does not exists');
            }
            return res.status(200).json(user);
        }
    );
}

function viewAllBaseUsers(req, res, next) {
    return BaseUserModel.find({},
        function(err, users) {
            if (err) {
                return next(err);
            }
            if (users == null) {
                return res.status(404).json('No users');
            }
            return res.json(users);
        }
    );
}

function updateBaseUser(req, res, next) {
    return BaseUserModel.findOne({ 'emailAddress': req.params.emailAddress }, 'emailAddress username password',
        function(err, user) {
            if (err) {
                return next(err);
            }
            if (user == null) {
                return res.status(404).json('User not found in the dBase');
            }
            user.email = req.body.emailAddress || user.emailAddress;
            user.username = req.body.username || user.username;
            user.password = user.generateHash(req.body.password) || user.password;
            user.save(function(err, user) {
                if (err) {
                    return next(err);
                }
                return res.json(user);
            });
        }
    );
}

function deleteBaseUser(req, res, next) {
    return BaseUserModel.findOneAndRemove({ 'emailAddress': req.params.emailAddress }, 'emailAddress username password',
        function(err, user) {
            if (err) {
                return next(err);
            }
            if (user == null) {
                return res.status(404).json('User not found');
            }
            return res.json(user);
        }
    );
}
/**
 * @description Expose `User` Model
 */

module.exports = {
    Employee: Employee,
    findBaseUser: findBaseUser,
    viewAllBaseUsers: viewAllBaseUsers,
    updateBaseUser: updateBaseUser,
    deleteBaseUser: deleteBaseUser
};