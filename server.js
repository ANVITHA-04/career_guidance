const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db'); // Your db.js file with MySQL connection

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve static HTML pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/login.html', (req, res) => res.sendFile(path.join(__dirname, 'public/login.html')));
app.get('/signup.html', (req, res) => res.sendFile(path.join(__dirname, 'public/signup.html')));
app.get('/qualification.html', (req, res) => res.sendFile(path.join(__dirname, 'public/qualification.html')));

// ✅ Signup Route
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.send('All fields are required');
  }

  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [name, email, password], (err, result) => {
    if (err) {
      console.error('Signup Error:', err);
      return res.send('Error registering user');
    }
    console.log('✅ User registered:', result);
    res.redirect('/qualification.html'); // Redirects to qualification after signup
  });
});

// ✅ Login Route
app.post('/login', (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.send('Both name and password are required');
  }

  const query = 'SELECT * FROM users WHERE name = ? AND password = ?';
  db.query(query, [name, password], (err, results) => {
    if (err) {
      console.error('Login Error:', err);
      return res.send('Login failed');
    }

    if (results.length > 0) {
      console.log('✅ Login successful for user:', name);
      res.redirect('/qualification.html');
    } else {
      res.send('Invalid credentials');
    }
  });
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
