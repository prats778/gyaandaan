var express = require('express');
var router = express.Router();
const Register=require('../server/models/users');

router.post('/sign-up', (req, res, next) => {
    console.log("Sign-up ", req.body);
    // res.send({status : "ok", what : req.body});
    try {
        console.log(req.body);
        // console.log("check-->",req.body.experience);  
        const registeruser=new Register({
            name:req.body.name,
            password:req.body.password,
            // phone:req.body.phone,
            email:req.body.email
            // role:req.body.role,
            // interests:req.body.interest
        });
        registeruser.save();
        
        // res.status(201).render('index');
        } catch (error) {
            res.status(400).send(error);
        }
        res.send("user registered");
});

router.post('/sign-in', (req, res, next) => {
    console.log("Sign-in ", req.body);
    res.send("Okay");
});

module.exports = router;
