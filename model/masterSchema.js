/*
 * Master Schema
 * @path models/masterSchema.js
 * @file masterSchema.js
 */
'use strict';

/*
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Base = require('./base/'); // Include the base schema

var ObjectId = mongoose.Schema.Types.ObjectId;

/** 
 * @schema Program & each has 3 phase
 * 
 * @description Program e.g. Core, IT, Bridgelabz. And each program has broadly 3 phases i.e.
 *  1: Core Programming Phase for 2 Weeks (Core, Adv)
 *  2. Sample App Development Phase for 6 Weeks
 *  3: Ideation App Development for 6 Weeks
 */
var Program = new Schema({
    title: {
        type: ObjectId,
        ref: 'User',
        unique: true,
        required: true
    },
    duration: { // in Weeks
        type: Number,
        trim: true
    },
    phase: [{
        title: String,
        duration: { // in Weeks
            type: Number,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        subPhase: [{ // Only in ideation - Started, inprogress, testing, completed
            title: String,
            description: String
        }]
    }],
    description: {
        type: String,
        trim: true
    }
});

/**
 * @schema Program
 * @description Program e.g. Core, IT, Bridgelabz.
 */
var GradeScale = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    scale: {
        type: Number,
        unique: ['The {{value}} already exists.']
    },
    description: {
        type: String,
        trim: true
    }
});


/**
 * Expose `Program` Model
 */
module.exports = {
    Program: mongoose.model('Program', Program),
    GradeScale: mongoose.model('GradeScale', GradeScale)
}