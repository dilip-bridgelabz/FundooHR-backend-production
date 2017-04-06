/**
 * Base router for the api.
 */

"use strict";

var express = require("express"),
    config = require('../../config/').config,
    logger = config.logger;

var router = express.Router({
    caseSensitive: true
});

router.get("/", function(req, res, next) {
    logger.trace("Loading api page");
    res.status(200).json({ status: "up" });
});

router.get("/test", function(req, res, next) {
    logger.trace("Loading test api");
    res.status(200).json({ status: "up", api: "test" });
});

//account
router.get("/account/get", function(req, res, next) {
    var id = req.query.id;
    if (null === id || "" === id || id === undefined) {
        res.status(200).json({ err: 1, message: "account id must be provided" });
    }
    logger.trace("Fetching details for account with id " + req.query.id);
    User.find({ wid: id }).select({
        _id: 0,
        __v: 0
    }).populate({
        path: "owner",
        select: {
            firstname: 1,
            lastname: 1,
            description: 1,
            designation: 1,
            _id: 0
        },
        populate: {
            path: "designation",
            select: {
                name: 1,
                _id: 0
            }
        }
    }).exec(function(err, workspaces) {
        if (err != null) {
            logger.error(err);
            res.status(500).json({ err: 500 });
        }
        res.status(200).json(account);
    });
});

router.get("/account/update", function(req, res, next) {
    logger.trace("account update api");
    res.status(200).json({ id: req.query.id });
});

router.get("/account/delete", function(req, res, next) {
    logger.trace("account delete api");
    res.status(200).json({ id: req.query.id });
});


module.exports = router;