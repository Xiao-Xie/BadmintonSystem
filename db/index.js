const mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '312312',
  database: process.env.DB_DATABASE || 'newbee',
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected to mysql!');
});

module.exports = connection;
