var express = require('express');
var router = express.Router();
const Register=require('../server/models/users');

router.post('/sign-up',async (req, res, next) => {
    console.log("Sign-up ", req.body);
    // res.send({status : "ok", what : req.body});
    let subjects=[];
    if(req.body.others)
        subjects=req.body.others.split(',');
    if(req.body.maths)
        subjects.push("maths");
    if(req.body.science)
        subjects.push("science");
    if(req.body.english)
        subjects.push("english");    

    try {
        console.log(req.body);
        // console.log("check-->",req.body.experience);  
        const registeruser=new Register({
            name:req.body.name,
            password:req.body.password,
            phone:req.body.phone,
            email:req.body.email,
            role:req.body.role,
            interests:subjects,
            about:req.body.about
        });
        registeruser.save();
        
        // res.status(201).render('index');
        } catch (error) {
            res.status(400).send(error);
        }
        // res.send("user registered");
        res.redirect("/pages/sign-in.html");
});

router.post('/sign-in',async (req, res, next) => {
    console.log("Sign-in ", req.body);
    // res.send("Okay");
    const email=req.body.email;
    const password=req.body.password;
    const useremail=await Register.findOne({email:email});
    if(useremail.password===password){
      res.cookie("email", email);
      res.cookie("ID" , 1991);
      res.send("Login successful");
    }
    else
    res.send("Password didnt match"); 
});

router.post('/slot-booking', (req, res, next) => {

});

module.exports = router;
