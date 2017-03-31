// auth.js
var passport = require("passport");
var passportJWT = require("passport-jwt");
var LocalStrategy = require('passport-local').Strategy,
var users = require("./users.js");
var cfg = require("./config.js");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
};
// Configure passport-local to use account model for authentication
passport.use(new LocalStrategy(User.User.authenticate()));
passport.serializeUser(User.User.serializeUser());
passport.deserializeUser(User.User.deserializeUser());


module.exports = function() {
    var strategy = new Strategy(params, function(payload, done) {
        var user = users[payload.id] || null;
        if (user) {
            return done(null, {
                id: user.id
            });
        } else {
            return done(new Error("User not found"), null);
        }
    });
    passport.use(strategy);
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", cfg.jwtSession);
        }
    };
};
