var express = require('express');
var router = express.Router();

router.get("/", function(request,response) {
    try {
      response.send({
        "status": true,
        "message": "Successfully retrived the dashborad data",
        "attendanceSummary": {
          "marked": 1,
          "unmarked": 35
        },
        "attendanceFallout": {
          "falloutEmployee": 35,
          "totalEmployee": 36
        },
        "leaveSummary": {
          "leave": 4
        }
      });
    } catch (e) {

    }finally {
        // response.on("finish", function() {
        // });
    }
});

module.exports = router;
