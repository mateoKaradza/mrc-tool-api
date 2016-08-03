var express = require('express');
var pool = require('../config/connection.js');

module.exports.GetPlatforms = function (callback) {
    pool.query('SELECT *, name as label FROM platforms', callback);
};