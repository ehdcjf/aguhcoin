const mysql = require('mysql2/promise');

const config = {
  host: 'localhost',
  user: 'root',
  password: '76oayaca',
  database: 'exchange',
  multipleStatements: true,
}

const pool = mysql.createPool(config);

module.exports = pool;