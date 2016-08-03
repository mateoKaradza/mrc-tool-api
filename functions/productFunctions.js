var express = require('express');
var pool = require('../config/connection.js');

module.exports.GetAllProducts = function (callback) {
	pool.query('SELECT * FROM products', callback);
};

module.exports.GetProductOrders = function (product_id, callback) {
  pool.query('SELECT *, (SELECT SUM(order_details.quantity * order_details.price) FROM order_details WHERE order_details.order_id = orders.order_id GROUP BY order_details.order_id) as total FROM order_details INNER JOIN orders on order_details.order_id = orders.order_id INNER JOIN platforms on orders.platform_id = platforms.platform_id WHERE order_details.product_id = ? ORDER BY orders.date DESC', product_id, callback);
};

module.exports.FilterProducts = function (filter, callback) {
    pool.query('SELECT * FROM products WHERE name LIKE ?', '%' + filter + '%', callback);
};

module.exports.InsertProduct = function (product, callback) {
    pool.query('INSERT into products SET ?', product , callback); 
};

module.exports.GetProduct = function (product_id, callback) {
    pool.query('SELECT * FROM products WHERE product_id = ?', product_id, callback);
};

module.exports.UpdateProduct = function (product, callback) {
    pool.query('UPDATE products SET ? WHERE product_id = ?', [ product, product.product_id ], callback);
};

module.exports.UpdateStatus = function (product_id, callback) {
    pool.query('UPDATE products SET status = NOT status WHERE product_id = ?', product_id, callback);
};

module.exports.UpdateQuantity = function (product_id, quantity, callback) {
    pool.query('UPDATE products SET quantity = quantity + ? WHERE product_id = ?', [ quantity, product_id ], callback);
};

module.exports.GetSupplies = function (product_id, callback) {
    pool.query('SELECT *, vendors.name as vendor_name, product_vendor.notes as supply_notes FROM product_vendor INNER JOIN vendors on vendors.vendor_id = product_vendor.vendor_id WHERE product_vendor.product_id = ? ORDER BY date_added DESC', product_id, callback);
};

module.exports.DeleteProduct = function (product_id, callback) {
    pool.query('DELETE FROM products WHERE product_id = ?', product_id, callback);
};
