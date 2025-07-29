const express = require('express');
const jwt = require('jsonwebtoken');
const Result = require('../models/Result'); // Import the Result model
const verifyAdmin = require('./verifyAdmin'); // Import the middleware
const router = express.Router();

const adminEmail = 'admin@admin.com';
const adminPassword = 'admin123';

// Admin Login Route (POST /admin/login)
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if the provided email and password match the admin credentials
  if (email === adminEmail && password === adminPassword) {
    const token = jwt.sign({ email }, 'your-secret-key', { expiresIn: '1h' }); // JWT secret key
    return res.json({ token });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});
router.get('/results', async (req, res) => {
    try {
      const results = await Result.find()
        .populate('userId', 'username')  // Populating userId with username
        .exec();
  
      res.json(results);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching results', error: err.message });
    }
  });
  
  module.exports = router;
