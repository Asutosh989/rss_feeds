var express = require('express');
var router = express.Router();


/* GET users listing. */
// router.get('/', function(req, res) {
//   res.send('respond with a resource');
// });

router.post('/login', function(req, res){
  var username = req.body.username;
  var password = req.body.password;

  if (username == "Admin" && password == "1234"){
    res.render('dashboard');
  }
  else {
    req.flash('error_msg', {"error":"Try Again"});
    res.locals.messages = req.flash();
    res.redirect('/');
  }

});
module.exports = router;
