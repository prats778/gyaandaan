var express = require('express');
var router = express.Router();
const Register=require('../server/models/users');
const Schedule=require('../server/models/enrolled');


//(prototype phase),incoming dates to be made dynamic later on
let matrix = [ 
    ["Slots", "Jan 22", "Jan 23", "Jan 24", "Jan 25", "Jan 26", "Jan 27", "Jan 28", "Jan 29"], 
    ["4-5", "booked", "available", "available", "booked", "booked", "booked", "booked", "booked"], 
    ["5-6", "booked", "booked", "booked", "booked", "available", "available", "available", "available"], 
    ["6-7", "booked", "available", "booked", "available", "available", "booked", "available", "available"], 
    ["7-8", "booked", "booked", "available", "booked", "booked", "available", "available", "booked"], 
    ["8-9", "booked", "available", "booked", "available", "booked", "booked", "booked", "available"], 
    ["9-10", "booked", "available", "available", "booked", "available", "booked", "booked", "available"], 
];
/* GET home page. */
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

// public view profile ----
router.get('/public/profile', async (req, res, next) => {
  try{
    console.log("pub ", req.query);
    let data = await Register.findOne({ email: req.query.email });
    if(!data){
      res.send(`<h3>No user with email '${req.query.email}'</h3>`);
    }
    else{
      console.log("data : ", data);
      // this need to store 
      let im_url = "/img/bruce-mars.jpg";
      if(data.img_url) im_url = data.img_url;

      let results = await Register.find();
      let connections=[]
      for(let i=0;i<results.length;i++)
         {
           if(results[i].email===data.email)
              continue;
           else
              connections.push(results[i]);
         }
      for(let i=0;i<connections.length;i++)
         {
           connections[i]['room_no']=i;
         } 
      res.render('profile', 
      { email : data.email, name : data.name, role : data.role, about : data.about, mobile : data.phone, connections : connections, interests : data.interests, img_url : im_url });
    }
    }
  catch(e){
    res.send("something went wrong");
  }
});

function check(subject,arr){
    for(let i=0;i<arr.length;i++)
          if(subject===arr[i])
              return true;
    return false;          
}

router.get('/pages/notifications.html',async (req,res,next)=>{
    res.render('notifications');
});
router.get('/pages/search.html',async (req, res, next) => {
  console.log("search page loaded ", req.query);
  // database query -> results
  let data = await Register.find({}); 
  const results=[];  
  const info={}; 
  const arr=[];

  if(req.query.class){

    for(let j=0;j<data.length;j++){
      // console.log("found user ",i,data[j].name);
      let score=0;

      for(let l=0;l<data[j].interests.length;l++)
         {
            if(check(data[j].interests[l],req.query.class))
                score++;
         }

      if(data[j].role === req.query.role){

          let str="";
          for(let l=0;l<data[j].interests.length;l++)
             {
               if(l)
                  str+=','
               str+=data[j].interests[l];
             }
          info[data[j].name]={
            name:data[j].name,
            email:data[j].email,
            role:data[j].role,
            interests:str,
            phone:data[j].phone,
            about:data[j].about,
            img_src:data[j].img_url,
            score:score
          };

          arr.push([data[j].name,score]);
        }   
    }   

    arr.sort((a,b)=>{
      return b[1]-a[1];
    });
    
    // console.log("array: ",arr);
    // console.log("info: ",info);
    for(let p=0;p<arr.length;p++){
      console.log(info[arr[p][0]]);
      results.push(info[arr[p][0]]);
    }
        // console.log("results: ",results);  
    //give all records in the database
    console.log("results final: ",results); 
    res.render('search', { name : "User", email : "not signed in",  results : results });
  }
  else{
        for(let j=0;j<data.length;j++){
          // console.log("found user ",i,data[j].name);
          let score=j;

          let str="";
          for(let l=0;l<data[j].interests.length;l++)
             {
               if(l)
                  str+=','
               str+=data[j].interests[l];
             }

          info[data[j].name]={
            name:data[j].name,
            email:data[j].email,
            role:data[j].role,
            interests:str,
            phone:data[j].phone,
            about:data[j].about,
            img_src: data[j].img_url,
            score:score
          };

          arr.push([data[j].name,score]);
        }   
        arr.sort((a,b)=>{
          return b[1]-a[1];
        });
        
        // console.log("array: ",arr);
        // console.log("info: ",info);
        for(let p=0;p<arr.length;p++){
          console.log(info[arr[p][0]]);
          results.push(info[arr[p][0]]);
        }
            // console.log("results: ",results);  
        //give all records in the database
        console.log("results final: ",results); 
        res.render('search', { name : "User", email : "not signed in",  results : results });
  }

});

// check auth here - make others protected ---
router.use('/', (req, res, next) => {
  console.log( "auth ", req.cookies.ID);
  if(req.cookies.ID !== "1991"){
    res.send(`<h3>Need to Sign In first</h3><a href="/pages/sign-in.html">sign in</a>`);
  }
  else next();  
});

router.get('/pages/virtual-contact',(req,res,next)=>{
  let room_no=0;
  if(req.query)
    room_no=req.query.room;
  res.render('virtual-contact',{room_no:room_no});
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
          let schedule=await Schedule.find({tutor:data.name});
          console.log(schedule);
          let im_url = "/img/bruce-mars.jpg";
          if(data.img_url) im_url = data.img_url;
        
          res.render('dashboard', 
            { email : data.email, name : data.name, role : data.role, about : data.about, mobile : data.phone, table : matrix, schedule:schedule, img_url : im_url});          
        }
    }
  );
});

router.get('/pages/profile.html', async (req, res, next) => {
  try{
    let data = await Register.findOne({ email: req.cookies.email });
    if(!data){
      res.render("sign-in", { created: "" });
    }
    else{
      console.log("data : ", data);
      let im_url = "/img/bruce-mars.jpg";
      if(data.img_url) im_url = data.img_url;

      let results = await Register.find();
      let connections=[]
      for(let i=0;i<results.length;i++)
         {
           if(results[i].email===data.email)
              continue;
           else
              connections.push(results[i]);
         }
      for(let i=0;i<connections.length;i++)
         {
           connections[i]['room_no']=i;
         } 
      res.render('profile', 
      { email : data.email, name : data.name, role : data.role, about : data.about, mobile : data.phone, connections : connections, interests : data.interests, img_url : im_url });
    }
  }
  catch(e){
    console.log(e);
    res.send("something went wrong: ");
  }
});

router.get('/pages/peek_profile', async (req, res, next) => {
  try{
    console.log("pub ", req.query);
    let data = await Register.findOne({ email: req.query.email });
    if(!data){
      res.send(`<h3>No user with email '${req.query.email}'</h3>`);
    }
    else{
      console.log("data : ", data);
      // this need to store 
      let im_url = "/img/bruce-mars.jpg";
      if(data.img_url) im_url = data.img_url;

      let results = await Register.find();
      let connections=[]
      for(let i=0;i<results.length;i++)
         {
           if(results[i].email===data.email)
              continue;
           else
              connections.push(results[i]);
         }
      for(let i=0;i<connections.length;i++)
         {
           connections[i]['room_no']=i;
         } 
      res.render('profile', 
      { email : data.email, name : data.name, role : data.role, about : data.about, mobile : data.phone, connections : connections, interests : data.interests, img_url : im_url });
    }
    }
  catch(e){
    res.send("something went wrong");
  }
});

router.post('/pages/mentee_scedule',(req,res,next)=>{
  console.log(req.body);
  res.send("got");
});

router.get('/pages/scheduling.html',async (req, res, next) => {
  // res.render('view_schedule',{mentor:"prats",mentee:"nikki",classes:[{id:1,content:"blablabla"}]});
    console.log("viewing schedule as ",req.cookies.name);
    if(req.cookies.name)
      {
       let tutor=req.query.user;
       let data = await Schedule.find();
       let classes=[];
       for(let i=0;i<data.length;i++){
          if(data[i].tutor===tutor)
             {
               console.log("data ",data[i] , data[i].about);
               let str="";
               str+=data[i].timings;
               str+="  ";
               str+=data[i].subject;
               str+=":";
               if(data[i].about)
                  str+=data[i].about;
               else 
                  str+="general  ";   
               str+="  Target Group: ";
               for(let j=0;j<data[i].target.length;j++)
                     {
                       if(j)
                         str+=",";
                       str+=data[i].target[j];
                     }
               let d={
                 id:i,
                 content:str
               };      
              //  console.log(d);
              //  d[id]=data[i]._id;
              //  d[content]=str;     
               classes.push(d);
             } 
       }
       console.log("classes: ",classes);
      //  res.send("ok"); 
       res.render("view_schedule",{mentor:tutor,mentee:req.cookies.name,classes:classes});
      }
    else
      {
       res.render("sign-in", { created: "" });
      }   
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

 router.post('/pages/confirm_schedule', async (req, res, next) => {
      
      if(req.cookies.name)
        {
        let tutor=req.query.mentor;
        let student=req.query.mentee;

        let class_ids=[];
        if(Array.isArray(req.body.class))
             class_ids=req.body.class;
        else
             class_ids.push(req.body.class);

        console.log("class_ids",class_ids);

        let data = await Schedule.find();

        let results=[]
        for(let i=0;i<data.length;i++){
            for(let j=0;j<class_ids.length;j++)
              {
                class_ids[i]=+class_ids[i];
                console.log(i," vs ",class_ids[j]);
                if(i===class_ids[j])
                     {
                      console.log("matched"); 
                      results.push(data[i]);
                     }
                      
              } 
        }
        console.log("result classes: ",results);

        let user_data = await Register.findOne({name:req.cookies.name});
           
        res.render("dashboard",{ email : user_data.email, name : user_data.name, role : user_data.role, about : user_data.about, mobile : user_data.phone, img_url:user_data.img_url, table:matrix, schedule : results});
        }
      else
        {
        res.render("sign-in", { created: "" });
        }  

 });

router.get('/pages/tables.html', (req, res, next) => {
  res.render('tables');
});

router.post('/pages/test', (req, res, next) => {
  console.log("got: ",req.body.subject);
  res.send("ok");
  // res.render('tables');
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
