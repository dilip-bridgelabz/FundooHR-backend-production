/*
 * Base User Profile Schema
 * @path models/base/user/baseUserProfileSchema.js
 * @file baseUserProfileSchema.js
 */
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('./Schema').BaseUser;

var ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * @schema BaseUserProfileSchema
 * @description Base User Profile details
 */
var BaseUserProfileSchema = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        unique: true,
        required: true
    },
    academic: [{
        isDegree: Boolean,
        isDiploma: Boolean,
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
        duration: {
            startDate: {
                type: Date
            },
            endDate: {
                type: Date
            }
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
    }]
});

/**
 * Expose `UserProfileSchema` 
 */
module.exports = mongoose.model('BaseUserProfile', BaseUserProfileSchema);; //mongoose.model('UserProfile', UserProfileSchema);