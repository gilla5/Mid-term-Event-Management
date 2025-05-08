const express = require('express');
const jwt = require('jsonwebtoken');
const Event = require('../models/Event');

const router = express.Router();

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

router.post('/', authenticate, async (req, res) => {
  const { title, date, time, location } = req.body;
  try {
    const event = new Event({
      title,
      date,
      time,
      location,
      creator: req.user.id,
    });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: 'Error creating event' });
  }
});

router.get('/', async (req, res) => {
  const events = await Event.find().populate('creator', 'username');
  res.json(events);
});

module.exports = router;
