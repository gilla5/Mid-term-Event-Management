const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
    const { title, date, time, location } = req.body;
    const newEvent = new Event({ title, date, time, location, createdBy: req.user._id });
    
    try {
        await newEvent.save();
        res.json(newEvent);
    } catch (error) {
        res.status(500).json({ message: 'Error creating event' });
    }
};

// other CRUD operations (read, update, delete) for events
