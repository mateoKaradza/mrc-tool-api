var express = require('express');
var router = express.Router();

var pool = require('../config/connection.js');


// All Feedbacks
router.get('/', function (req, res) {
    res.redirect('/api/customers');
});

module.exports = router;