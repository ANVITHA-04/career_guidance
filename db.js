// db.js
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root', // use your MySQL root password here
  database: 'career_guidance'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('✅ Connected to MySQL database');
});

module.exports = db;
