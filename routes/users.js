var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');

var userFunctions = require('../functions/userFunctions.js');

router.get('/verify', function (req, res) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  jwt.verify(token, req.app.get('superSecret'), function(err, decoded) {      
    if (err) return res.status(401).json({ err: 'Failed to authenticate token.' }); 
    req.decoded = decoded;
    res.json({ username: decoded.username, token });
  });
});

router.post('/login', function (req, res, next) {
  userFunctions.GetUser(req.body.username, function (err, user) {
    if (err) return next(err);
    else if (!user) return next(new Error('User does not exist!'));
    
    userFunctions.ComparePasswords(req.body.password, user[0].password, function (resp) {
      if (resp) {
        const payload = {username: user[0].username};
        var token = jwt.sign(payload, req.app.get('superSecret'), { expiresIn: "1 day" });
        return res.json({ token });
      } else 
      res.status(401).json({ err: 'Passwords do not match!' });
    });
  });
});

module.exports = router;