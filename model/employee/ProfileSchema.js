/*
 * Employee Profile Schema
 * @path model/employee/ProfileSchema.js
 * @file ProfileSchema.js
 */
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    BaseSchema = require('../base/').Base;

var ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * @schema ProfileSchema
 * @description Employee Profile details
 */
var ProfileSchema = new Schema({
    employeeID: {
        type: String,
        unique: true,
        required: true
    },
    academic: [{
        isDiploma: Boolean,
        isDegree: Boolean,
        qualification: {
            type: String,
            trim: true
        },
        university: {
            type: String,
            trim: true
        },
        collage: {
            type: String,
            trim: true
        },
        discipline: {
            type: String,
            trim: true
        },
        agreegatePercentage: {
            type: Number
        },
        finalYearPercentage: {
            type: Number
        },
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        },
        yearOfPassing: {
            type: Date
        },
        comments: {
            type: String
        }
    }],
    achievements: [{
        title: {
            type: String,
            trim: true
        },
        achivedOn: {
            type: Date,
            trim: true
        },
        location: {
            type: String
        },
        comments: {
            type: String
        }
    }],
    recognition: [{
        for: {
            type: String,
            trim: true
        },
        recognisedOn: {
            type: Date,
            trim: true
        },
        comments: {
            type: String
        }
    }],
    training: [{
        institute: {
            type: String,
            trim: true
        },
        trainingIn: {
            type: Date,
            trim: true
        },
        duration: {
            type: String
        },
        location: {
            type: String
        },
        comments: {
            type: String
        }
    }]
});

/**
 * Expose `Profile` Model
 */
module.exports = mongoose.model('Profile', ProfileSchema);