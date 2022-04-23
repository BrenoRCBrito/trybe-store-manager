const { createPool } = require('mysql2/promise');
require('dotenv').config();

module.exports = createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});
