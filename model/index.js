'use strict';

var config = require('../config/'),
    Base,
    User;

module.exports = {
    init: function() {
        require('./base/');
        require('./employee/');
    },
    Employee: require('./employee/'),
    Company: require('./base/'),
    Master: require('./masterSchema'),
    ClientCompany: require('./clientSchema')
};