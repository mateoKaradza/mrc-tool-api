var express = require('express');
var router = express.Router();
var async = require('async');

var pool = require('../config/connection.js');

var productFunctions = require('../functions/productFunctions.js');
var orderFunctions = require('../functions/orderFunctions.js');

// All Products - split
router.get('/', function (req, res, next) {
    productFunctions.GetAllProducts(function (err, products) {
        if (err) return next(err);
        res.json(products);
    }); 
});

router.get('/search/:query', function (req, res, next) {
    productFunctions.FilterProducts(req.params.query, function (err, products) {
        if (err) return next(err);
        res.json(products);
    });
});

router.post('/new' , function (req, res, next) {
    productFunctions.InsertProduct(req.body.product, function (err, product) {
        if (err) return next(err);
        res.status(201).json(product);
    }); 
});

router.get('/:id/', function (req, res, next) {
    productFunctions.GetProduct(req.params.id, function (err, product) {
        if (err) return next(err);
        res.json(product);
    }); 
});

router.post('/:id/edit', function (req, res, next) {
    productFunctions.UpdateProduct(req.body.product, function (err, product) {
        if (err) return next(err);
        res.json(product);
    });
});

router.delete('/:id/', function (req, res, next) {
    async.waterfall([function (callback) {
        productFunctions.GetSupplies(req.params.id, callback)
    }, function (supplies, fields, callback) {
        if (supplies.length === 0) return productFunctions.GetProductOrders(req.params.id, callback);
        callback('product has supplies');
    }, function (orders, fields, callback) {
        if (orders.length === 0) return productFunctions.DeleteProduct(req.params.id, callback);
        callback('product is part of orders');
    }], function (err, results) {
        if(err) return next(err);
        res.json(results);
    })
});

router.get('/:id/orders', function (req, res, next) {
    productFunctions.GetProductOrders(req.params.id, function (err, orders) {
		if (err) return next(err);
        res.json(orders);
    }); 
});

router.get('/:id/supplies', function (req, res, next) {
    productFunctions.GetSupplies(req.params.id, function (err, supplies) {
		if (err) return next(err);
        res.json(supplies);
    }); 
});

router.post('/:id/status', function (req, res, next) {
    productFunctions.UpdateStatus(req.body.product_id, function (err, product) {
        if (err) return next(err);
        res.json(product);
    });
});

module.exports = router;
