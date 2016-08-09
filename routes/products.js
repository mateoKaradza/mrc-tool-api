var express = require('express');
var router = express.Router();

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

// promise

// front end does the two checks, but if avoided can cause error since product exists as a foreign key in other tables
router.delete('/:id/', function (req, res, next) {
    productFunctions.GetSupplies(req.params.id, function (err, supplies) {
		if (err || supplies.length > 0) return next(err || new Error('This product has supplies - delete them first.'));
        productFunctions.GetProductOrders(req.params.id, function (err, orders) {
            if (err || orders.length > 0) return next(err || new Error('This product exists in orders - delete it from there first.'));
            productFunctions.DeleteProduct(req.params.id, function (err, deleted) {
                if (err) return next(err);
                res.json(deleted);
            });
        }); 
    }); 
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
