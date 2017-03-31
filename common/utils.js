/**
 * FundooHR-Backend
 *
 * @author  Dilip <dilip.more@bridgelabz.com>
 * @license ISC Licensed
 * @version 1.0
 *
 * Copyright(c) 2017 Bridgelabz <admin@bridgelabz.com>
 */
;
'use strict';

/**
 * @description Utils exposes the required function
 * @param  {[type]} object [description]
 * @return {[type]}        [description]
 */
var simpleStringify = function (object){
    var simpleObject = {};
    for (var prop in object ){
        if (!object.hasOwnProperty(prop)){
            continue;
        }
        if (typeof(object[prop]) == 'object'){
            continue;
        }
        if (typeof(object[prop]) == 'function'){
            continue;
        }
        simpleObject[prop] = object[prop];
    }
    return JSON.stringify(simpleObject); // returns cleaned up JSON
};

module.exports = {
    simpleStringify: simpleStringify
};
