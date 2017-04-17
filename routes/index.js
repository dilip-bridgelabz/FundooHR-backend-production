'use strict';
/**
 *Module Dependencies
 */
var
    express = require('express'),
    passport = require('../authenticate/auth'),
    UserUtils = require('../model/'),
    jwt = require('jsonwebtoken'),
    isLoggedIn = require('../authenticate/');
/**
 *Create Router instance
 */
var router = express.Router();

/**
 *Middleware
 */
router.use(passport.initialize());
router.use(passport.session());

/**
 * @description Routes
 */
router.route('/login')
    .post(function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info) {
            if (err) {
                return next(err); // will generate a 500 error
            }
            if (!user) {
                if (info.message === "Missing credentials") {
                    info.message = "Username, Password is blank. No Username & Password passed.";
                }
                return res.status(401).json({ status: false, message: info.message });
            }
            var token = jwt.sign(user, 'superSecret', {
                expiresIn: 86400 // expires in 24 hours
            });

            // return the information including token as JSON
            return res.json({
                status: true,
                message: 'User logged in successfully',
                token: token
            });
        })(req, res, next);
    });

router.route('/signup')
    .post(function(req, res, next) {
        passport.authenticate('local-signup', function(err, user, info) {
            if (err) {
                return next(err); // will generate a 500 error
            }
            if (!user) {
                console.log(JSON.stringify(info));
                return res.status(401).json({ status: false, message: info.message });
            }
            return res.json({ status: true, message: 'User registered successfully' });
        })(req, res, next);
    });

// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------
router.use(function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.params['token'] || req.headers['x-access-token'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, 'superSecret', function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'Unauthorized access. You are not authorized to access.'
        });
    }
});

router.get('/', function(req, res) {
    return res.json({ status: true, message: 'Welcome to the FundooHR API' });
});

router.get('/dashboard', function(req, res, next) {
    var user = req.user;
    return res.render('pages/dashboard', {
        user: profile,
        currentProfile: currentProfile,
        person: person,
        linkStatus: linkStatus
    });
});
router.post('/doAttendance', require("./api/doAttendance"));



router.get('/logout', function(req, res) {
    req.logout();
    req.session.destroy();
    return res.redirect('/');
});

/**
 *Export Module
 */
module.exports = router;
