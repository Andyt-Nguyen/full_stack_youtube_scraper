const mysql = require('mysql2')
require('dotenv').config()

let connection;

// For Heroku Deployment vs. Local MySQL Database
if(process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else{
  connection = mysql.createConnection({
    port     : process.env.DB_PORT,
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD, 
    database : process.env.DB_DATABASE 
  });
}

// Export the Connection
module.exports = connection;