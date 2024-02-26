const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const authenticateUser = require('../middleware/authMiddleware');
require('dotenv').config();

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET;

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ name });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { name, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ name });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create and sign a JWT token
    const token = jwt.sign({ user: { id: user.id } }, jwtSecret, { expiresIn: '1h' }); // Replace with your actual secret key

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Example protected route
router.get('/protected', authenticateUser, (req, res) => {
  res.json({ message: 'Protected route. You are authenticated.' });
});

module.exports = router;
