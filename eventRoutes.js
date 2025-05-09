const express = require('express');
const Event = require('../models/Event');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

router.post('/', auth, async (req, res) => {
  const { title, date, time, location } = req.body;
  const newEvent = new Event({ title, date, time, location, createdBy: req.user });
  await newEvent.save();
  res.json(newEvent);
});

router.put('/:id', auth, async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (event.createdBy.toString() !== req.user) return res.status(403).json({ message: 'Unauthorized' });

  Object.assign(event, req.body);
  await event.save();
  res.json(event);
});

router.delete('/:id', auth, async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (event.createdBy.toString() !== req.user) return res.status(403).json({ message: 'Unauthorized' });

  await event.remove();
  res.json({ message: 'Event deleted' });
});

module.exports = router;
