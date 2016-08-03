var express = require('express');
var router = express.Router();

var pool = require('../config/connection.js');

var customerFunctions = require('../functions/customerFunctions.js')

router.get('/', function (req, res) {
    if (req.query.search === undefined) 
        customerFunctions.GetAllCustomers(function (err, allCustomers) {
            if (err) res.status(400).json(err);
            else res.json(allCustomers);
        });
    else 
        customerFunctions.FilterCustomers(req.query.search, function (err, allCustomers) {
            if (err) res.status(400).json(err);
            else res.json(allCustomers);
        });
    
});

router.post('/new' , function (req, res) {
    customerFunctions.InsertCustomer(req.body.customer, function (err, customer) {
        if (err) res.status(400).json(err);
        else res.status(201).json(customer);
    }); 
});

router.get('/:id/', function (req, res) {
    customerFunctions.GetCustomer(req.params.id, function (err, customer) {
        if (err) res.status(400).json(err);
        else res.json(customer);
    });
});

router.delete('/:id/', function (req, res) {
    customerFunctions.GetOrders(req.params.id, function (err, orders) {
		if (err || orders.length > 0) res.status(400).json(err);
        else
            customerFunctions.DeleteCustomer(req.params.id, function (err, deleted) {
                if (err) res.status(400).json(err);
                else res.json(deleted);
            })
    }); 
});

router.post('/:id/edit', function (req, res) {
    customerFunctions.UpdateCustomer(req.body.customer, function (err, customer) {
        if (err) res.status(400).json(err);
        else res.json(customer);
    });
});

router.get('/:id/orders', function (req, res) {
    customerFunctions.GetOrders(req.params.id, function (err, orders) {
        if (err) res.status(400).json(err);
        else res.json(orders);
    });
});

router.get('/:id/items', function (req, res) {
    customerFunctions.ProductsByCustomer(req.params.id, function (err, items) {
        if (err) res.status(400).json(err);
        else res.json(items);
    });
});

module.exports = router;
