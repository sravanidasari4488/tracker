const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const mysql = require('mysql');

dotenv.config();

const app = express();
const PORT = 8083; // Changed to avoid port conflict

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Your MySQL username
  password: 'root',  // Your MySQL password
  database: 'bus_tracking_db',  // The database you created
});

db.connect(err => {
  if (err) {
    console.log('Error connecting to database:', err);
    return;
  }
  console.log('Connected to the database.');
});

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the Bus Tracking API!');
});

// Login Route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, result) => {
    if (err) {
      console.log('Database error:', err);
      return res.status(500).send('Server error');
    }

    if (result.length > 0) {
      const user = result[0];
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

      res.json({
        message: 'Login successful!',
        token,
        firstName: user.first_name,
        email: user.email,
      });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Connected to the database.');
});
