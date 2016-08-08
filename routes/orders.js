var express = require('express');
var router = express.Router();

var pool = require('../config/connection.js');

var orderFunctions = require('../functions/orderFunctions.js');
var otherFunctions = require('../functions/otherFunctions.js');
var productFunctions = require('../functions/productFunctions.js');
var inventoryFunctions = require('../functions/inventoryFunctions.js');

router.get('/platforms', function (req, res) {
    otherFunctions.GetPlatforms(function (err, platforms) {
        if (err) return next(err);
        res.json(platforms);
    }); 
});

router.get('/', function (req, res) {
    orderFunctions.GetAllOrders(function (err, orders) {
        if (err) return next(err);
        res.json(orders);
    }); 
});

router.post('/new' , function (req, res) {
    orderFunctions.InsertOrder(req.body.order, function (err, order) {
        if (err) return next(err);
        res.status(201).json(order);
    }); 
});

router.get('/:id', function (req, res) {
    orderFunctions.GetOrderInfo(req.params.id, function (err, order) {
        if (err) return next(err);
        res.json(order);
    }); 
});

router.delete('/:id/', function (req, res) {
    orderFunctions.GetOrderItemList(req.params.id, function (err, items) {
		if (err || items.length > 0) return next(err || new Error('Order containers items - delete them first.'));    
        orderFunctions.DeleteOrder(req.params.id, function (err, deleted) {
            if (err) return next(err);
            res.json(deleted);
        });
    }); 
});

router.post('/:id/edit', function (req, res) {
    orderFunctions.UpdateOrder(req.body.order, function (err, order) {
        if (err) return next(err);
        res.json(order);
    });
});

router.get('/:id/items', function (req, res) {
    orderFunctions.GetOrderItemList(req.params.id, function (err, items) {
        if (err) return next(err);
        res.json(items);
    });
});

router.post('/:id/item/new', function (req, res) {
    orderFunctions.InsertOrderItem(req.body.item, function (err, item) {
        if (err) return next(err);
        productFunctions.UpdateQuantity(req.body.item.product_id, -Number(req.body.item.quantity), function (err, update) {
            if (err) return next(err);
            res.status(201).json(update);
        });
    });
});

router.get('/:id/items/:order_details_id', function (req, res) {
    orderFunctions.GetOrderItem(req.params.order_details_id, function (err, item) {
        if (err) return next(err);
        res.status(201).json(item);
    });
});

//async
router.post('/:id/item/edit', function (req, res) {
    orderFunctions.GetOrderItem(req.body.item.order_details_id, function (err, oldItem) {
        if (err) return next(err);
        orderFunctions.UpdateOrderItem(req.body.item, function (err, item) {
            if (err) return next(err);
            const theQuantity = Number(oldItem[0].quantity) - Number(req.body.item.quantity);
            productFunctions.UpdateQuantity(req.body.item.product_id, theQuantity, function (err, update) {
                if (err) return next(err);
                res.status(201).json(update);
            });
        });
    });
});

router.post('/:id/item/delete', function (req, res) {
    orderFunctions.DeleteOrderItem(req.body.item.order_details_id, function (err, item) {
        if (err) return next(err);
        productFunctions.UpdateQuantity(req.body.item.product_id, Number(req.body.item.quantity), function (err, update) {
            if (err) return next(err);
            res.status(201).json(update);
        });
    });
});

module.exports = router;
