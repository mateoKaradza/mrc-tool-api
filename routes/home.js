var express = require('express');
var router = express.Router();

var pool = require('../config/connection.js');

router.get('/', function (req, res) {
    res.redirect('/api/customers');
});

module.exports = router;