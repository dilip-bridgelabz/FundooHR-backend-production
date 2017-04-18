var config = require('../../config/'),
    Base,
    User;

module.exports = {
    init: function() {
        require('../base/');
        require('./UserSchema');
    },
    User: require('./UserSchema'),
    Employee: require('./EmployeeSchema'),
    Personal: require('./PersonalSchema'),
    Profile: require('./ProfileSchema'),
    HRDetails: require('./HRSchema'),
    EmployeeDocument: require('./EmployeeDocumentSchema'),
    BankDetail: require('./BankDetailSchema'),
    Tracking: require('./TrackingSchema'),
    Attendance: require('./AttendancesSchema')
};