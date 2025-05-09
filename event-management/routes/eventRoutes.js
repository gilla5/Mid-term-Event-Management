const express = require('express');
const Event = require('../models/event');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/', auth, async (req, res) => {
  const { title, date, time, location } = req.body;
  
  if (!title || !date || !time || !location) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newEvent = new Event({
      title,
      date,
      time,
      location,
      createdBy: req.user // Set the user ID who created the event
    });

    await newEvent.save();
    res.json(newEvent); // Make sure this is sending back the event data
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});


// Update event
router.put('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // Ensure the user is the creator of the event
    if (event.createdBy.toString() !== req.user.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Update event
    Object.assign(event, req.body);
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete event
router.delete('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // Ensure the user is the creator of the event
    if (event.createdBy.toString() !== req.user.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await event.remove();
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
