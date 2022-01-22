var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('first', { data: 'Express' });
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
  res.render('dashboard');
});

router.get('/pages/profile.html', (req, res, next) => {
  res.render('profile');
});

router.get('/pages/notifications.html', (req, res, next) => {
  res.render('notifications');
});

router.get('/pages/tables.html', (req, res, next) => {
  res.render('tables');
});


module.exports = router;
