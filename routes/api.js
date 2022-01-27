var express = require('express');
var router = express.Router();
const Register=require('../server/models/users');

router.post('/sign-up',async (req, res, next) => {
    console.log("Sign-up ", req.body);
    // res.send("ok"); return;
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
            about:req.body.about,
            img_url:req.body.img_url
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
    // console.log("=> ", useremail);
    if(useremail && useremail.password===password){
        res.cookie("email", email);
        res.cookie("ID" , "1991");
        res.cookie("name",useremail.name);
        // res.send("Login successful");
        res.redirect('/pages/dashboard.html');
    }
    else
    res.send("Credentials didnt match"); 
});

router.post('/mentee_schedule',(req,res,next)=>{
    console.log(req.body);
    res.send("got");
});


router.post('/test', (req, res, next) => {
    console.log("got: ",req.body);
    res.send("ok");
    // res.render('tables');
  });

router.post('/slot-booking', (req, res, next) => {
    console.log(req.body);
    console.log(req.query);
});

module.exports = router;
