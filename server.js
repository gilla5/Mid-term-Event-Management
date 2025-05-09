const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); 
const Event = require('./models/Event'); 

dotenv.config();

const app = express();

app.use(express.json()); 
app.use(cors()); 

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error: ', err));

const User = require('./models/User');

app.post('/api/signup', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'User created successfully', token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied, token missing' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

app.post('/api/events', authenticateJWT, async (req, res) => {
    const { title, date, time, location } = req.body;

    try {
        const event = new Event({ title, date, time, location, user: req.user.userId });
        await event.save();

        res.status(201).json({ message: 'Event created successfully', event });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/api/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/api/user-events', authenticateJWT, async (req, res) => {
    try {
        const events = await Event.find({ user: req.user.userId });
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.put('/api/events/:id', authenticateJWT, async (req, res) => {
    const { id } = req.params;
    const { title, date, time, location } = req.body;

    try {
        const event = await Event.findOneAndUpdate(
            { _id: id, user: req.user.userId },
            { title, date, time, location },
            { new: true }
        );
        if (!event) return res.status(404).json({ message: 'Event not found or not authorized' });

        res.status(200).json({ message: 'Event updated successfully', event });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.delete('/api/events/:id', authenticateJWT, async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findOneAndDelete({ _id: id, user: req.user.userId });
        if (!event) return res.status(404).json({ message: 'Event not found or not authorized' });

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
