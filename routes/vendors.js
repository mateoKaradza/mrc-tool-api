var express = require('express');
var router = express.Router();

var pool = require('../config/connection.js');

var vendorFunctions = require('../functions/vendorFunctions.js')

router.get('/', function (req, res) {
    if (req.query.search === undefined) 
        return vendorFunctions.GetAllVendors(function (err, allVendors) {
            if (err) return next(err);
            res.json(allVendors);
        });
    
    vendorFunctions.FilterVendors(req.query.search, function (err, allVendors) {
        if (err) return next(err);
        res.json(allVendors);
    });
});

router.post('/new' , function (req, res) {
    vendorFunctions.InsertVendor(req.body.vendor, function (err, vendor) {
        if (err) return next(err);
        res.json(vendor);
    });
});

router.get('/:id/', function (req, res) {
    vendorFunctions.GetVendor(req.params.id, function (err, vendor) {
        if (err) return next(err);
        res.json(vendor);
    });
});

router.post('/:id/edit', function (req, res) {
    vendorFunctions.UpdateVendor(req.body.vendor, function (err, update) {
        if (err) return next(err);
        res.json(update);
    });
});

//  check for existing supplies!!!!!!!!!
router.delete('/:id/', function (req, res) {
    vendorFunctions.DeleteVendor(req.params.id, function (err, vendor) {
        if (err) return next(err);
        res.json(vendor);
    });
});

router.get('/:id/supplies', function (req, res) {
    vendorFunctions.GetSupplies(req.params.id, function (err, supplies) {
        if (err) return next(err);
        res.json(supplies);
    });
});

router.post('/:id/supplies/new', function (req, res) {
    vendorFunctions.InsertSupply(req.body.supply, function (err, supply) {
        if (err) return next(err);
        res.json(supply);
    });
});

router.get('/:id/supplies/:unique_id', function (req, res) {
    vendorFunctions.GetSupply(req.params.unique_id, function (err, supply) {
        if (err) return next(err);
        res.json(supply);
    });
});

router.post('/:id/supplies/edit', function (req, res) {
    vendorFunctions.EditSupply(req.body.supply, function (err, products) {
        if (err) return next(err);
        res.json(products);
    });
});

router.delete('/:id/supplies/delete', function (req, res) {
    vendorFunctions.DeleteSupply(req.body.supply.unique_id, function (err, supply) {
        if (err) return next(err);
        res.json(supply);
    });
});

module.exports = router;
