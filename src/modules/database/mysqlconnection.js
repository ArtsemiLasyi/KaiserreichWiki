const fs = require("fs");
const mysql = require("mysql2");


const configContent = fs.readFileSync("database_config/config", "utf-8");
const configElems = configContent.split("\r\n");


const pool = mysql.createPool({
  connectionLimit: 10,
  host: configElems[0],
  user: configElems[1],
  password: configElems[2], 
  database: configElems[3]
}).promise();


module.exports.ConnectionPool = pool;