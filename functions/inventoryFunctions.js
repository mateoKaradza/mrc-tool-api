var express = require('express');
var pool = require('../config/connection.js');

module.exports.UpdateInventory = function (item, callback) {
    pool.query('UPDATE products SET quantity = quantity - ? WHERE product_id = ?' [ item.quantity - item.quantityOld, item.product_id], callback);     
};