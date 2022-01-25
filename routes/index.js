var express = require('express');
var router = express.Router();
const Register=require('../server/models/users');
const Schedule=require('../server/models/enrolled');
/* GET home page. */
let matrix = [ 
    ["Slots", "Jan 22", "Jan 23", "Jan 24", "Jan 25", "Jan 26", "Jan 27", "Jan 28", "Jan 29"], 
    ["4-5", "booked", "available", "Jan 24", "Jan 25", "Jan 26", "Jan 27", "Jan 28", "Jan 29"], 
    ["5-6", "booked", "available", "Jan 24", "Jan 25", "Jan 26", "Jan 27", "Jan 28", "Jan 29"], 
    ["6-7", "booked", "available", "Jan 24", "available", "Jan 26", "Jan 27", "Jan 28", "Jan 29"], 
    ["7-8", "booked", "available", "Jan 24", "Jan 25", "Jan 26", "available", "Jan 28", "Jan 29"], 
    ["8-9", "booked", "available", "Jan 24", "Jan 25", "Jan 26", "Jan 27", "Jan 28", "Jan 29"], 
    ["9-10", "booked", "available", "Jan 24", "Jan 25", "Jan 26", "Jan 27", "Jan 28", "Jan 29"], 
];

// let matrix2 = [ 
//   ["Slots", "Jan 22", "Jan 23", "Jan 24", "Jan 25", "Jan 26", "Jan 27", "Jan 28", "Jan 29"], 
//   ["4-5", {date:"Jan 22",time:"4-5",subject:"",target:"",}], 
//   ["5-6", "booked", "available", "Jan 24", "Jan 25", "Jan 26", "Jan 27", "Jan 28", "Jan 29"], 
//   ["6-7", "booked", "available", "Jan 24", "available", "Jan 26", "Jan 27", "Jan 28", "Jan 29"], 
//   ["7-8", "booked", "available", "Jan 24", "Jan 25", "Jan 26", "available", "Jan 28", "Jan 29"], 
//   ["8-9", "booked", "available", "Jan 24", "Jan 25", "Jan 26", "Jan 27", "Jan 28", "Jan 29"], 
//   ["9-10", "booked", "available", "Jan 24", "Jan 25", "Jan 26", "Jan 27", "Jan 28", "Jan 29"], 
// ];

router.get('/', function(req, res, next) {
  let mat = [ [ "hello", "hi", "bro"], [ "This", "is", "table"]]
  res.render('first', 
    { data: 'Express', name : "roders", arr : [ "hello", "hi",  "bro" ], show : 0, role : "mentee", matrix : mat });
});

router.get('/pages/sign-in.html', (req, res, next) => {
  res.render('sign-in');
});

router.get('/pages/sign-up.html', (req, res, next) => {
  res.render('sign-up');
});

// check auth here - make others protected
router.use('/', (req, res, next) => {
  console.log( "auth ", req.cookies.ID);
  // if(req.cookies.ID !== 1991){
  //   res.send("Need to Sign In first");
  // }
  // else next();  
  next();
});

router.get('/pages/dashboard.html', (req, res, next) => {
  // ping /pages/dashboard.html?role=mentor : for mentor
  
  Register.findOne(
    { email: req.cookies.email },
    async function (err, data) {
      if (!data) {
        res.render("sign-in", { created: "" });
      } else {
          console.log(data);
          res.render('dashboard', 
            { email : data.email, name : data.name, role : data.role, about : data.about, mobile : data.phone, table : matrix });          
        }
    }
  );
});

router.get('/pages/profile.html', (req, res, next) => {
  res.render('profile');
});

router.get('/pages/notifications.html', (req, res, next) => {
  res.render('notifications');
});

router.get('/pages/discussion', (req, res, next) => {

 try{ 
  Register.findOne(
    { email: req.cookies.email },
    async function (err, data) {
      if (!data) {
        res.render("sign-in", { created: "" });
      } else {
          console.log("found user",data);
          res.render("discussion",{name:data.name});
        }
    }
  );  
 }
 catch(error){
  res.status(400).send(error);
 }

});

router.get('/pages/tables.html', (req, res, next) => {
  res.render('tables');
});

router.get('/pages/slot-book', (req, res, next) => {
  // res.render('slot-book', { id : 77, date : "25 Jan", time : "6PM - 7PM" });
    console.log("Slot : ", req.query);
    
    let username="";

    Register.findOne(
      { email: req.cookies.email },
      async function (err, data) {
        if (!data) {
          res.render("sign-in", { created: "" });
        } else {
            console.log("found user",data);
            res.render("slot-book",{name:data.name,date:req.query.date,time:req.query.time});
          }
      }
    );    
    // res.send("Booked!!")  
});

router.post('/pages/slot-booking', (req, res, next) => {

  try {
      // console.log(req.body);
      console.log(req.body);
      console.log(req.query);
      // console.log("check-->",req.body.experience);  
      let index=req.query.time+'-'+req.query.date;
      let timing= "Jan "+ (+req.query.date + 21) + " "+ (+req.query.time + 3) + "-" + (+req.query.time + 4) + "pm";  
      console.log("timing: ",timing);

      const schedule=new Schedule({
        tableindex:index,
        tutor:req.query.name,
        subject:req.body.subject,
        studentsEnrolled:17,
        timings:timing,
        target:req.body.class,
        link:req.body.link,
        resources: req.body.resources 
      });
      schedule.save(); 
      // res.status(201).render('index');
      } catch (error) {
          res.status(400).send(error);
      }
      req.query.time=+req.query.time;
      req.query.date=+req.query.date;

      matrix[req.query.time][req.query.date]="booked";
      // res.send("user registered");
      res.redirect("/pages/dashboard.html");
});
module.exports = router;
