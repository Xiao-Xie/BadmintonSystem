const mysql = require('mysql');
const { host, user, password, database } = require('../config');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".
const connection = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database,
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected to msql!');
});

module.exports = connection;
