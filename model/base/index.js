'use strict';

var config = require('../../config/'),
    Base,
    User;

module.exports = {
    init: function() {
        require('./base');
    },
    Base: require('./base')
};