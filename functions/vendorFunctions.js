var express = require('express');
var pool = require('../config/connection.js');

module.exports.GetAllVendors = function (callback) {
    pool.query('SELECT * from vendors ORDER BY vendor_id DESC', callback);
};

module.exports.InsertVendor = function (vendor, callback) {
    pool.query('INSERT INTO vendors SET ?', vendor, callback);
};

module.exports.GetVendor = function (vendor_id, callback) {
    pool.query('SELECT * FROM vendors WHERE vendor_id = ?', vendor_id, callback);
};

module.exports.GetSupplies = function (vendor_id, callback) {
    pool.query('SELECT *, products.name as product_name, product_vendor.quantity as quantity FROM product_vendor INNER JOIN products on products.product_id = product_vendor.product_id WHERE vendor_id = ? ORDER BY date_added DESC', vendor_id, callback);
};

module.exports.UpdateVendor = function (vendor, callback) {
    pool.query('UPDATE vendors SET ? WHERE vendor_id = ?', [ vendor, vendor.vendor_id ], callback);
};

module.exports.DeleteVendor = function (vendor_id, callback) {
    pool.query('DELETE FROM vendors WHERE vendor_id = ?', vendor_id, callback);
};

module.exports.InsertSupply = function (supply, callback) {
    pool.query('INSERT INTO product_vendor SET ?', supply, callback);
};

module.exports.EditSupply = function (data, callback) {
    pool.query('UPDATE product_vendor SET ? WHERE unique_id = ?', [ data, data.unique_id ], callback);
};

module.exports.GetSupply = function (unique_id, callback) {
    pool.query('SELECT *, products.name as product_name, product_vendor.quantity as quantity FROM product_vendor INNER JOIN products on products.product_id = product_vendor.product_id WHERE unique_id = ?', unique_id, callback); 
};

module.exports.FilterVendors = function (filter, callback) {
    pool.query('SELECT * FROM vendors WHERE name LIKE ? OR email LIKE ? OR contact_person LIKE ? OR notes LIKE ?', ['%' +  filter + '%', '%' +  filter + '%', '%' +  filter + '%', '%' +  filter + '%'], callback);
};

module.exports.DeleteSupply = function (unique_id, callback) {
    pool.query('DELETE FROM product_vendor WHERE unique_id = ?', unique_id, callback);
};