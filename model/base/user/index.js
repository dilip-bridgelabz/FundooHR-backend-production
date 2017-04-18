var config = require('../../../config/'),
    Base,
    User;

module.exports = {
    init: function() {
        require('../../base/');
        require('./Schema');
    },
    User: require('./Schema'),
    Personal: require('./PersonalSchema'),
    Profile: require('./ProfileSchema'),
    HRDetails: require('./HRSchema'),
    Bank: require('./BankSchema'),
    Tracking: require('./TrackingSchema'),
    Attendance: require('./AttendanceSchema')
};