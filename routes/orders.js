var express = require('express');
var router = express.Router();
var async = require('async');

var pool = require('../config/connection.js');

var orderFunctions = require('../functions/orderFunctions.js');
var otherFunctions = require('../functions/otherFunctions.js');
var productFunctions = require('../functions/productFunctions.js');
var inventoryFunctions = require('../functions/inventoryFunctions.js');

router.get('/platforms', function (req, res, next) {
    otherFunctions.GetPlatforms(function (err, platforms) {
        if (err) return next(err);
        res.json(platforms);
    }); 
});

router.get('/', function (req, res, next) {
    orderFunctions.GetAllOrders(function (err, orders) {
        if (err) return next(err);
        res.json(orders);
    }); 
});

router.post('/new' , function (req, res, next) {
    orderFunctions.InsertOrder(req.body.order, function (err, order) {
        if (err) return next(err);
        res.status(201).json(order);
    }); 
});

router.get('/:id', function (req, res, next) {
    orderFunctions.GetOrderInfo(req.params.id, function (err, order) {
        if (err) return next(err);
        res.json(order);
    }); 
});

// with async
router.delete('/:id/', function (req, res, next) {
    async.waterfall([function (callback) {
        orderFunctions.GetOrderItemList(req.params.id, callback)
    }, function (items, unknownArg, callback) {
        if (items.length === 0) return orderFunctions.DeleteOrder(req.params.id, callback);
        callback('order has items');
    }], function (err, results) {
        if(err) return next(err);
        res.json(results);
    })
});

router.post('/:id/edit', function (req, res, next) {
    orderFunctions.UpdateOrder(req.body.order, function (err, order) {
        if (err) return next(err);
        res.json(order);
    });
});

router.get('/:id/items', function (req, res, next) {
    orderFunctions.GetOrderItemList(req.params.id, function (err, items) {
        if (err) return next(err);
        res.json(items);
    });
});

// promise
router.post('/:id/item/new', function (req, res, next) {
    async.waterfall([function (callback) {
        orderFunctions.InsertOrderItem(req.params.id, callback)
    }, function (callback) {
        productFunctions.UpdateQuantity(req.body.item.product_id, -Number(req.body.item.quantity), callback)
    }], function (err, results) {
        if(err) return next(err);
        res.json(results);
    })
});

router.get('/:id/items/:order_details_id', function (req, res, next) {
    orderFunctions.GetOrderItem(req.params.order_details_id, function (err, item) {
        if (err) return next(err);
        res.status(201).json(item);
    });
});

router.post('/:id/item/edit', function (req, res, next) {
    var _oldItem;
    async.waterfall([function (callback) {
        orderFunctions.GetOrderItem(req.body.item.order_details_id, callback)
    }, function (oldItem, unknownArg, callback) {
        _oldItem = oldItem;
        orderFunctions.UpdateOrderItem(req.body.item, callback);
    }, function (item, unknownArg, callback) {
        const theQuantity = Number(_oldItem[0].quantity) - Number(req.body.item.quantity);
        productFunctions.UpdateQuantity(req.body.item.product_id, theQuantity, callback);
    }], function (err, results) {
        if(err) return next(err);
        res.json(results);
    })
});

router.post('/:id/item/delete', function (req, res, next) {
    async.waterfall([function (callback) {
        orderFunctions.DeleteOrderItem(req.body.item.order_details_id, callback)
    }, function (callback) {
        productFunctions.UpdateQuantity(req.body.item.product_id, Number(req.body.item.quantity), callback)
    }], function (err, results) {
        if(err) return next(err);
        res.json(results);
    })
});

module.exports = router;
