var express = require('express');
var pool = require('../config/connection.js');

module.exports.GetAllOrders = function (callback) {
    pool.query('select *, (SELECT SUM(order_details.quantity * order_details.price) FROM order_details where order_details.order_id = orders.order_id GROUP BY order_details.order_id) as total FROM orders INNER JOIN customers on customers.customer_id = orders.customer_id INNER JOIN platforms on orders.platform_id = platforms.platform_id ORDER BY orders.date DESC LIMIT 100', callback);
};

module.exports.GetAllOrdersByProduct = function (product_id, callback) {
  pool.query('SELECT customers.first_name as FirstName, customers.last_name as LastName, orders.order_id as OrderId, order_details.quantity as Quantity, orders.date as Date, order_details.price as Price FROM order_details INNER JOIN orders on order_details.order_id = orders.order_id INNER JOIN customers on orders.customer_id = customers.customer_id where order_details.product_id = ? ORDER BY orders.date DESC', product_id, callback);
};

module.exports.GetOrderInfo = function (order_id, callback) {
    pool.query('select *, orders.notes as notes, platforms.name as platform_name, orders.notes as order_notes FROM orders INNER JOIN customers on orders.customer_id = customers.customer_id INNER JOIN platforms on orders.platform_id = platforms.platform_id where orders.order_id = ?', order_id, callback);
};

module.exports.GetOrderItemList = function (order_id, callback) {
    pool.query('select *,order_details.quantity * order_details.price as total, order_details.inventory_cost as inventory_cost, order_details.quantity as quantity, products.name as product_name, order_details.first_stone_earning as first_stone_earning, order_details.second_stone_earning as second_stone_earning, order_details.third_stone_earning as third_stone_earning FROM order_details INNER JOIN products on order_details.product_id = products.product_id WHERE order_details.order_id = ? ORDER BY order_details.price ASC', order_id, callback);
};

module.exports.InsertOrderItem = function (item, callback) {
    pool.query('INSERT INTO order_details SET ?', item, callback);
};

module.exports.InsertOrder = function (order, callback) {
    pool.query('INSERT INTO orders SET ?', order, callback)};

module.exports.UpdateOrder = function (order, callback) {
    pool.query('UPDATE orders SET ? WHERE order_id = ?', [ order, order.order_id ], callback)
};

module.exports.GetOrderItem = function (order_details_id, callback) {
    pool.query('SELECT *, products.name as product_name, order_details.quantity as quantity FROM order_details INNER JOIN products ON products.product_id = order_details.product_id WHERE order_details_id = ?', order_details_id, callback);
};

module.exports.DeleteOrderItem = function(order_details_id, callback) {
    pool.query('DELETE FROM order_details WHERE order_details_id = ?', order_details_id, callback);
};

module.exports.UpdateOrderItem = function(item, callback) {
    pool.query('UPDATE order_details SET ? WHERE order_details_id = ?', [ item, item.order_details_id ], callback);
};

module.exports.DeleteOrder = function (order_id, callback) {
    pool.query('DELETE FROM orders WHERE order_id = ?', order_id, callback);
}
