/*
 * Base User Tracking Schema
 * @path models/base/user/BaseUserTrackingSchema.js
 * @file BaseUserTrackingSchema.js
 */
'use strict';

/*
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('./Schema').BaseUser;

var ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * @schema BaseUserTrackingSchema
 * @description Tracking details for the user
 */
var BaseUserTrackingSchema = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        unique: true,
        required: true
    },
    programAssessment: [{
        weeklyTasksAssessment: [{
            title: { // Quality of Work, responsiveness, Communication, Attitude, Productivity, Growth, Performance, Dependability etc... 
                type: String,
                enum: ['Quality of Code', 'Responsiveness', 'Communication', 'Attitude']
            },
            description: { //Work:
                type: String
            },
            phase: {
                type: String
            },
            subphase: {
                type: String
            },
            weekNumber: {
                type: Number
            },
            reviewer: {
                type: ObjectId,
                ref: 'User'
            },
            // from: { // Task or Week start date
            //     type: Date,
            //     trim: true
            // },
            // to: { // Task or Week end date
            //     type: Date,
            //     trim: true
            // },
            completionDate: { // WeekCompleteionDate
                type: Date
            },
            actualCompletionDate: {
                type: Date
            },
            rating: { // U = Unsatisfactory, F = Fair, S = Satisfactory, G = Good, E = Excellent, N = Not Reviewed or Not Applicable
                type: ObjectId,
                ref: 'GradeScale'
            },
            feedback: String,
        }],
        overallRating: { // 1-5   U = Unsatisfactory, F = Fair, S = Satisfactory, G = Good, E = Excellent, N = Not Reviewed or Not Applicable
            type: ObjectId,
            ref: 'GradeScale'
        },
        assessedBy: { //Software Engineer, Sr Software Developers 
            type: ObjectId,
            ref: 'User'
        },
        assessedOn: {
            type: Date
        }
    }]
});

/**
 * Expose `BaseUserTracking` Model
 */
module.exports = mongoose.model('BaseUserTracking', BaseUserTrackingSchema);