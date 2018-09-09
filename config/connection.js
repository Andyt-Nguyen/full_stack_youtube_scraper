const mysql = require('mysql2')
require('dotenv').config()

let connection;
if(process.env.JAWSDB_URL){ // Deployment
  connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else{ // Production
  connection = mysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_DATABASE,
  });
}


module.exports = connection;
