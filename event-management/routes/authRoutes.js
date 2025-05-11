const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();


router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: 'User already exists' });

   
    const hashed = await bcrypt.hash(password, 12); // Increased salt rounds for security

    
    const user = new User({ username, password: hashed });
    await user.save();

   
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

module.exports = router;
