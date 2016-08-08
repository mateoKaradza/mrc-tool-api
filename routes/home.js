var express = require('express');
var router = express.Router();

var pool = require('../config/connection.js');

router.get('/', function (req, res, next) {
    return next(new Error('SEND FILE VIA THIS ROUTE'));
});

module.exports = router;