var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit : 10,
	host: 'localhost',
    user     : 'root',
    password : '',
    database : 'moonrise_crystals_database',
    dateStrings: 'date'
});

module.exports = pool;