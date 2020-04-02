// *********************************************************************************
// connection.js
// *********************************************************************************

// Connection Dependencies
var mysql = require("mysql");

// Connection Information
var connection = mysql.createConnection({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "root",
  database: "burgerseq_db"
});

if (process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host:'zy4wtsaw3sjejnud.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user:'xgl2dbbtmor8e5ri',
    password: 'ewy9ne28y8ydcyd8',
    database: 'qyg91dg1pa5sjhau'
  });
};


// Connect to Database
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export Connection
module.exports = connection;