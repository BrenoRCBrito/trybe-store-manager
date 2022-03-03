const mysql = require('mysql2/promise');

module.exports = mysql.createPool({
  host: 'localhost',
  user: 'brcb',
  password: '81424741',
  database: 'StoreManager',
});