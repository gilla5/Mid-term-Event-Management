const Event = require('../models/Event');

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find({ userId: req.user.id });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve events' });
    }
};

exports.createEvent = async (req, res) => {
    const { title, date, time, location } = req.body;
    try {
        const event = new Event({ title, date, time, location, userId: req.user.id });
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create event' });
    }
};

exports.updateEvent = async (req, res) => {
    const { id } = req.params;
    const { title, date, time, location } = req.body;
    try {
        const event = await Event.findOneAndUpdate(
            { _id: id, userId: req.user.id },
            { title, date, time, location },
            { new: true }
        );
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update event' });
    }
};

exports.deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findOneAndDelete({ _id: id, userId: req.user.id });
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete event' });
    }
};
