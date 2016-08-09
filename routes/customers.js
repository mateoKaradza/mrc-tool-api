var express = require('express');
var router = express.Router();
var async = require('async');

var pool = require('../config/connection.js');

var customerFunctions = require('../functions/customerFunctions.js')

router.get('/', function (req, res, next) {
    customerFunctions.GetAllCustomers(function (err, allCustomers) {
        if (err) return next(err);
        res.json(allCustomers);
    });
});

router.get('/search/:query', function (req, res, next) {
    customerFunctions.FilterCustomers(req.params.query, function (err, allCustomers) {
        if (err) return next(err);
        res.json(allCustomers);
    });
});

router.post('/new' , function (req, res, next) {
    customerFunctions.InsertCustomer(req.body.customer, function (err, customer) {
        if (err) return next(err);
        res.status(201).json(customer);
    }); 
});

router.get('/:id/', function (req, res, next) {
    customerFunctions.GetCustomer(req.params.id, function (err, customer) {
        if (err) return next(err);
        res.json(customer);
    });
});


router.delete('/:id/', function (req, res, next) {
    async.waterfall([function (callback) {
        customerFunctions.GetOrders(req.params.id, callback)
    }, function (orders, fields, callback) {
        if (orders.length === 0) return customerFunctions.DeleteCustomer(req.params.id, callback);
        callback('customer has orders');
    }], function (err, results) {
        if(err) return next(err);
        res.json(results);
    })
});


router.post('/:id/edit', function (req, res, next) {
    customerFunctions.UpdateCustomer(req.body.customer, function (err, customer) {
        if (err) return next(err);
        res.json(customer);
    });
});

router.get('/:id/orders', function (req, res, next) {
    customerFunctions.GetOrders(req.params.id, function (err, orders) {
        if (err) return next(err);
        res.json(orders);
    });
});

router.get('/:id/items', function (req, res, next) {
    customerFunctions.ProductsByCustomer(req.params.id, function (err, items) {
        if (err) return next(err);
        res.json(items);
    });
});

module.exports = router;
