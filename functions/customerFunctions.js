var express = require('express');
var pool = require('../config/connection.js');

module.exports.GetAllCustomers = function (callback) {
    pool.query('SELECT * from customers ORDER BY customer_id DESC LIMIT 100', callback);
};

module.exports.InsertCustomer = function (customer, callback) {
    pool.query('INSERT INTO customers SET ?', customer, callback);
};

module.exports.GetCustomer = function (customer_id, callback) {
    pool.query('SELECT * FROM customers WHERE customer_id= ?', customer_id, callback);
};

module.exports.FilterCustomers = function (filter, callback) {
    pool.query('SELECT * FROM customers WHERE username LIKE ? OR email LIKE ? OR first_name LIKE ? OR last_name LIKE ? OR notes LIKE ?', ['%' +  filter + '%', '%' +  filter + '%', '%' +  filter + '%', '%' +  filter + '%', '%' +  filter + '%'], callback);
};

module.exports.GetOrders = function (customer_id, callback) {
    pool.query('SELECT *, (SELECT SUM(order_details.quantity * order_details.price) FROM order_details WHERE order_details.order_id = orders.order_id GROUP BY order_details.order_id) as total FROM orders INNER JOIN platforms on orders.platform_id = platforms.platform_id WHERE orders.customer_id = ? ORDER BY order_id DESC', customer_id, callback);
};

module.exports.UpdateCustomer = function (customer, callback) {
    pool.query('UPDATE customers SET ? WHERE customer_id = ?', [ customer, customer.customer_id ], callback);
};

module.exports.ProductsByCustomer = function (customer_id, callback) {
  pool.query('SELECT order_details_id, orders.order_id, date, products.name as product_name, order_details.quantity as quantity from products INNER JOIN order_details on order_details.product_id = products.product_id INNER JOIN orders on order_details.order_id = orders.order_id WHERE orders.customer_id = ? ORDER BY product_name ASC', customer_id, callback);
};

module.exports.DeleteCustomer = function (customer_id, callback) {
    pool.query('DELETE FROM customers WHERE customer_id = ?', customer_id, callback);
}
