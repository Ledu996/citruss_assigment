const mysql = require('mysql2');
const util = require('util');
require('dotenv').config()

// all goes in .env
const con = mysql.createConnection(
    {
        host:process.env.HOST, 
        user: process.env.USER, 
        database: process.env.DATABASE,
        password: process.env.password,
    }
  );

  // enable async await syntax for database queries
  con.query = util.promisify(con.query).bind(con);



  con.connect((err) => {
    if (err) throw err;
    console.log('Connection successfully established');
})

module.exports = con;

  
// connection 