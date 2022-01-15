const express=require('express');
const app=express();
const path=require("path");
// const hbs=require("hbs");
// const fs = require("fs");

// require("./db/conn");

// const Register=require('./models/registers');
const port=process.env.PORT || 3000;

const static_path=path.join(__dirname,"../");
// const template_path=path.join(__dirname,"../templates/views");
// const partials_path=path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
// app.set("view engine","hbs");
// app.set("views",template_path);
// hbs.registerPartials(partials_path);

var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb://prats:14augustboom@cluster0-shard-00-00.eq6x1.mongodb.net:27017,cluster0-shard-00-01.eq6x1.mongodb.net:27017,cluster0-shard-00-02.eq6x1.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-a784sn-shard-0&authSource=admin&retryWrites=true&w=majority";
MongoClient.connect(uri, function(err, client) {
  const collection = client.db("test").collection("devices");
  console.log("connected");
  // perform actions on the collection object
  client.close();
});

app.get('/',(req,res)=>{
    res.render("index")
});


// app.get('/signupmentee',(req,res)=>{
//     res.render("signupmentee");
// });
// app.get('/signupmentor',(req,res)=>{
//     res.render("signupmentor");
// });
// app.get('/signupbtn',(req,res)=>{
//     res.render("signupbtn");
// });
// app.get('/login',(req,res)=>{
//     res.render("sign-in");
// });

// //create new user in db
// app.post('/registermentee',async(req,res)=>{
// try {
// const registeruser=new Register({
//     name:req.body.name,
//     password:req.body.password,
//     phone:req.body.phone,
//     email:req.body.email,
//     role:"mentee",
//     interest:req.body.interest
// });
// registeruser.save();
// res.status(201).render('index');
// } catch (error) {
//     res.status(400).send(error);
// }
// });
// app.post('/registermentor',async(req,res)=>{
//     try {
//     const registeruser=new Register({
//         name:req.body.name,
//         password:req.body.password,
//         phone:req.body.phone,
//         email:req.body.email,
//         role:"mentor",
//         interest:req.body.interest,
//         company:req.body.company,
//         experience:req.body.experience
//     });
//     registeruser.save();
//     res.status(201).render('index');
//     } catch (error) {
//         res.status(400).send(error);
//     }
//     });

app.listen(port,()=>{
console.log(`Listening at port http://localhost:${port}/login`);
})