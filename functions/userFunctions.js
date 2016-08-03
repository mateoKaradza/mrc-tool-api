var bcrypt = 'bcryptjs';

var pool = require('../config/connection.js');

module.exports.GetUser = function (username, callback) {
  pool.query('SELECT * FROM users WHERE username = ? LIMIT 1', username, callback);
};

module.exports.ComparePasswords = function (password, hash, callback) {
  callback(password === hash); // bcrypt is not working, comparing plain passwords
};