var express = require('express');
var router = express.Router();
const Register=require('../server/models/users');
const Schedule=require('../server/models/enrolled');

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
      let connections = [ 
        { name : "pub-remx",  email : "remx@gmail.com", class : "10", about : "I lobh gyaandaan", interest: ["Maths", "Chemistry"], img_src : "https://image.shutterstock.com/image-vector/remix-grunge-brush-stroke-word-260nw-1636661941.jpg"},  
        { name : "pub-remx2", email : "remx@gmail.com", class : "1", about : "I lobh gyaandaan", interest: ["Maths", "Chemistry"], img_src : "https://image.shutterstock.com/image-vector/remix-grunge-brush-stroke-word-260nw-1636661941.jpg"},  
        { name : "pub-remx3", email : "remx@gmail.com", class : "3", about : "I lobh gyaandaan", interest: ["Maths", "Chemistry"], img_src : "https://image.shutterstock.com/image-vector/remix-grunge-brush-stroke-word-260nw-1636661941.jpg"},  
        { name : "pub-remx4", email : "remx@gmail.com", class : "4", about : "I lobh gyaandaan", interest: ["Maths", "Chemistry"], img_src : "https://image.shutterstock.com/image-vector/remix-grunge-brush-stroke-word-260nw-1636661941.jpg"},  
        { name : "pub-remx5", email : "remx@gmail.com", class : "6", about : "I lobh gyaandaan", interest: ["Maths", "Chemistry"], img_src : "https://image.shutterstock.com/image-vector/remix-grunge-brush-stroke-word-260nw-1636661941.jpg"},  
      ]; 
      let im_url = "/img/bruce-mars.jpg";
      if(data.img_url) im_url = data.img_url;
      res.render('profile', 
      { email : data.email, name : data.name, role : data.role, about : data.about, mobile : data.phone, connections : connections, interests : data.interests, img_url : im_url });
    }
  }
  catch(e){
    res.send("something went wrong");
  }
});

// -----------------async ,await mind fuck-----------------
// init()
// async function dbQuery() {

//     const users = await Register.find({});
//     return users;
// }

// async function init() {
//     try {
//         const data= await dbQuery();
//         return data;
//     } catch (error) {
//         console.log(error);
//     }
// }

// async function operation(props) {
//   console.log("props: ",props);
//   if(props.class)
//   {
//     try{

//     }
//     catch(error){

//     } 
    
//     res.send("ok");
//   }
// else
//   {
//     console.log("not requested");
//     let i=0;
//     let info={};
//     let arr=[];
//     init().then(data=>{
//       // console.log("info ",data)
//       for(let j=0;j<data.length;j++){
//         // console.log("found user ",i,data[j].name);
//         i++;
//         let score=i;

//         info[data[j].name]={
//           name:data[j].name,
//           email:data[j].email,
//           interests:data[j].interests,
//           phone:data[j].phone,
//           about:data[j].about,
//           img_src:"https://image.shutterstock.com/image-vector/remix-grunge-brush-stroke-word-260nw-1636661941.jpg",
//           score:score
//         };
//         arr.push([data[j].name,score]);
//       }   
//       arr.sort((a,b)=>{
//         return b[1]-a[1];
//       });
//       const results=[];
//       // console.log("array: ",arr);
//       // console.log("info: ",info);
//       for(let p=0;p<arr.length;p++){
//         console.log(info[arr[p][0]]);
//         results.push(info[arr[p][0]]);
//       }
//       console.log("results: ",results);
//       return results;
//       // console.log(arr);           
//     }).catch(err=>console.log(err));     

//   }  
// }

//-----------async wait find fuck end--------------

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
            img_src:"https://image.shutterstock.com/image-vector/remix-grunge-brush-stroke-word-260nw-1636661941.jpg",
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
  res.render('virtual-contact',{room_no:0});
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
      // this need to store - connections of a user
      let connections = [ 
        { name : "remx",  email : "remx@gmail.com", class : "10", about : "I lobh gyaandaan", interest: ["Maths", "Chemistry"], img_src : "https://image.shutterstock.com/image-vector/remix-grunge-brush-stroke-word-260nw-1636661941.jpg"},  
        { name : "remx2", email : "remx@gmail.com", class : "1", about : "I lobh gyaandaan", interest: ["Maths", "Chemistry"], img_src : "https://image.shutterstock.com/image-vector/remix-grunge-brush-stroke-word-260nw-1636661941.jpg"},  
        { name : "remx3", email : "remx@gmail.com", class : "3", about : "I lobh gyaandaan", interest: ["Maths", "Chemistry"], img_src : "https://image.shutterstock.com/image-vector/remix-grunge-brush-stroke-word-260nw-1636661941.jpg"},  
        { name : "remx4", email : "remx@gmail.com", class : "4", about : "I lobh gyaandaan", interest: ["Maths", "Chemistry"], img_src : "https://image.shutterstock.com/image-vector/remix-grunge-brush-stroke-word-260nw-1636661941.jpg"},  
        { name : "remx5", email : "remx@gmail.com", class : "6", about : "I lobh gyaandaan", interest: ["Maths", "Chemistry"], img_src : "https://image.shutterstock.com/image-vector/remix-grunge-brush-stroke-word-260nw-1636661941.jpg"},  
      ]; 
      let im_url = "/img/bruce-mars.jpg";
      if(data.img_url) im_url = data.img_url;
      res.render('profile', 
      { email : data.email, name : data.name, role : data.role, about : data.about, mobile : data.phone, connections : connections, interests : data.interests, img_url : im_url });
    }
  }
  catch(e){
    res.send("something went wrong");
  }
});

router.get('/pages/peek_profile', async (req, res, next) => {
  try{

    let data = await Register.findOne({ email: req.query.email });
    if(!data){
      res.render("sign-in", { created: "" });
    }
    else{
      console.log("data : ", data);
      // this need to store - connections of a user
      let connections = [ 
        { name : "remx",  email : "remx@gmail.com", class : "10", about : "I lobh gyaandaan", interest: ["Maths", "Chemistry"], img_src : "https://image.shutterstock.com/image-vector/remix-grunge-brush-stroke-word-260nw-1636661941.jpg"},  
        { name : "remx2", email : "remx@gmail.com", class : "1", about : "I lobh gyaandaan", interest: ["Maths", "Chemistry"], img_src : "https://image.shutterstock.com/image-vector/remix-grunge-brush-stroke-word-260nw-1636661941.jpg"},  
        { name : "remx3", email : "remx@gmail.com", class : "3", about : "I lobh gyaandaan", interest: ["Maths", "Chemistry"], img_src : "https://image.shutterstock.com/image-vector/remix-grunge-brush-stroke-word-260nw-1636661941.jpg"},  
        { name : "remx4", email : "remx@gmail.com", class : "4", about : "I lobh gyaandaan", interest: ["Maths", "Chemistry"], img_src : "https://image.shutterstock.com/image-vector/remix-grunge-brush-stroke-word-260nw-1636661941.jpg"},  
        { name : "remx5", email : "remx@gmail.com", class : "6", about : "I lobh gyaandaan", interest: ["Maths", "Chemistry"], img_src : "https://image.shutterstock.com/image-vector/remix-grunge-brush-stroke-word-260nw-1636661941.jpg"},  
      ]; 

      res.render('profile', 
      { email : data.email, name : data.name, role : data.role, about : data.about, mobile : data.phone, connections : connections, interests : data.interests });
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

router.get('/pages/sch.html',async (req, res, next) => {

  try{ 
     console.log("viewing schedule as ",req.cookies.name);
     if(req.cookies.name)
       {
        let tutor=req.query.user;
        let data = await Schedule.find();
        let classes=[];
        for(let i=0;i<data.length;i++){
           if(data[i].tutor===tutor)
              {
                let d={};
                let str="";
                str+=data[i].timings;
                str+=" ";
                str+=data[i].subject;
                str+=":";
                str+=data[i].about;
                str+=" Target Group: ";
                for(let j=0;j<data[i].target.length;j++)
                      {
                        if(j)
                          str+=",";
                        str+=data[i].target[j];
                      }
                d[id]=data[i]._id;
                d[content]=str;     
                classes.push(d);
              } 
        }
        console.log("classes: ",classes);
        res.render("view_schedule",{mentor:tutor,mentee:req.cookies.name,classes:classes});
       }
     else
       {
        res.render("sign-in", { created: "" });
       }   
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
           
        res.render("dashboard",{ email : user_data.email, name : user_data.name, role : user_data.role, about : user_data.about, mobile : user_data.phone, schedule : results});
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
