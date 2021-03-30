const config = require('config');
const mysql = require("mysql2");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: config.get("host"),
  user: config.get("username"),
  password: config.get("password"),
  database: config.get("database")
}).promise();


module.exports.ConnectionPool = pool;
