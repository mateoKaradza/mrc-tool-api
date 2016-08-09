var express = require('express');
var router = express.Router();

var pool = require('../config/connection.js');

router.get('/', function (req, res, next) {
    res.send('Wrong address')
});

module.exports = router;