var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');
var router = express.Router();
var logger = require('morgan');

var jwt = require('jsonwebtoken');

var cors = require('cors');

// Configure app
app.use(cors());
app.set('json spaces', 2);
app.use('', router);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.set('superSecret', 'the-shared-secret-54875425')

// Routing
var theRoutes = require('./routes');
app.use('/api', theRoutes);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
}); }); }

// Port & Successful Start Message
app.listen(1337, function () {
	console.log('Everything went smooth.');
	console.log("To use the tool visit http://localhost:1337 ");
});
