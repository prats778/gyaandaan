var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

///super helpful
app.use(( err, req, res, next ) => {
    res.locals.error = err;
    if (err.status >= 100 && err.status < 600)
      res.status(err.status);
    else
      res.status(500);
    res.render('error');
});
////

app.use('/api', apiRouter);
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// const express=require('express');
// const app=express();
// const path=require("path");
const mongoose=require('mongoose');
// const hbs=require("hbs");
// const fs = require("fs");

// require("./db/conn");


const port=process.env.PORT || 3000;

// const static_path=path.join(__dirname,"../");

// app.use(express.static(static_path));

mongoose 
 .connect("mongodb://prats:14augustboom@cluster0-shard-00-00.eq6x1.mongodb.net:27017,cluster0-shard-00-01.eq6x1.mongodb.net:27017,cluster0-shard-00-02.eq6x1.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-a784sn-shard-0&authSource=admin&retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

module.exports = app;
