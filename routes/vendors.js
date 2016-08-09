var express = require('express');
var router = express.Router();

var pool = require('../config/connection.js');

var vendorFunctions = require('../functions/vendorFunctions.js')

router.get('/', function (req, res, next) {
    vendorFunctions.GetAllVendors(function (err, allVendors) {
        if (err) return next(err);
        res.json(allVendors);
    });
});

router.get('/search/:query', function (req, res, next) {
    vendorFunctions.FilterVendors(req.params.query, function (err, allVendors) {
        if (err) return next(err);
        res.json(allVendors);
    });
});

router.post('/new' , function (req, res, next) {
    vendorFunctions.InsertVendor(req.body.vendor, function (err, vendor) {
        if (err) return next(err);
        res.json(vendor);
    });
});

router.get('/:id/', function (req, res, next) {
    vendorFunctions.GetVendor(req.params.id, function (err, vendor) {
        if (err) return next(err);
        res.json(vendor);
    });
});

router.post('/:id/edit', function (req, res, next) {
    vendorFunctions.UpdateVendor(req.body.vendor, function (err, update) {
        if (err) return next(err);
        res.json(update);
    });
});

router.delete('/:id/', function (req, res, next) {
    vendorFunctions.getSupplies(req.params.id, function (err, supplies) {
        if (err || supplies.length > 0) return next(err || new Error('Vendor has supplies - delete them first.'))
        vendorFunctions.DeleteVendor(req.params.id, function (err, vendor) {
                if (err) return next(err);
                res.json(vendor);
        })
    });
});

router.get('/:id/supplies', function (req, res, next) {
    vendorFunctions.GetSupplies(req.params.id, function (err, supplies) {
        if (err) return next(err);
        res.json(supplies);
    });
});

router.post('/:id/supplies/new', function (req, res, next) {
    vendorFunctions.InsertSupply(req.body.supply, function (err, supply) {
        if (err) return next(err);
        res.json(supply);
    });
});

router.get('/:id/supplies/:unique_id', function (req, res, next) {
    vendorFunctions.GetSupply(req.params.unique_id, function (err, supply) {
        if (err) return next(err);
        res.json(supply);
    });
});

router.post('/:id/supplies/edit', function (req, res, next) {
    vendorFunctions.EditSupply(req.body.supply, function (err, products) {
        if (err) return next(err);
        res.json(products);
    });
});

router.delete('/:id/supplies/delete', function (req, res, next) {
    vendorFunctions.DeleteSupply(req.body.supply.unique_id, function (err, supply) {
        if (err) return next(err);
        res.json(supply);
    });
});

module.exports = router;
