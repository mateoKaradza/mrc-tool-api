var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');

var Customers = require('./customers');

var Home = require('./home');
var Customers = require('./customers');
var Orders = require('./orders');
var Products = require('./products');
var Vendors = require('./vendors');
var Users = require('./users');

// unprotected
router.use('/', Home);
router.use('/users', Users);

router.use(function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (!token) return res.status(403).send({ message: 'No token provided.' });
  
  jwt.verify(token, req.app.get('superSecret'), function(err, decoded) {      
    if (err) return res.status(403).json({ message: 'Failed to authenticate token.' });    
    req.decoded = decoded; 
    next();
  });
});

// protected
router.use('/customers', Customers);
router.use('/orders', Orders);
router.use('/products', Products);
router.use('/vendors', Vendors);

module.exports = router;
