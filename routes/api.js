var express = require('express');
var router = express.Router();

router.post('/sign-up', (req, res, next) => {
    console.log("Sign-up ", req.body);
    res.send({status : "ok", what : req.body});
});

router.post('/sign-in', (req, res, next) => {
    console.log("Sign-in ", req.body);
    res.send("Okay");
});

module.exports = router;
