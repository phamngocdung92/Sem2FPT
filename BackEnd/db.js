var mysql = require('mysql');
var dbConfig = require('../config/db.config');
const db = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

db.connect(() => console.log('Da ket noi database !'));
module.exports = db;
