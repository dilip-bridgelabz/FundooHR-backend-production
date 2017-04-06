/**
 * @description module dependencies
 */
'use strict';

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ status: false, message: "You are not authorized to access this" });
}

module.exports = isLoggedIn;

// var routes = require("../routes/index"),
//     api = require("../routes/api/index"),
//     config = require('../config/').config,
//     logger = config.logger;

// var appRoutes = function(app, passport) {
//     app.use("/api", isAuthenticated, api);
//     app.use("/", routes);
// };

// /**
//  * [isAuthenticated description]
//  * @method isAuthenticated
//  * @param  {[type]}        req  [description]
//  * @param  {[type]}        res  [description]
//  * @param  {Function}      next [description]
//  * @return {Boolean}       [description]
//  */
// function isAuthenticated(req, res, next) {
//     if (req.isAuthenticated())
//         return next();
//     res.status(401).json({ status: false, message: "You are not authorized to access this" });
// }

// /**
//  * @description Exporting the routes
//  */
// module.exports = appRoutes;