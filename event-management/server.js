const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const Event = require('./models/event');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');

    const existingEvents = await Event.find();
    if (existingEvents.length === 0) {
      await Event.insertMany([
        {
          title: 'Sample Event 1',
          date: '2025-06-01',
          time: '10:00 AM',
          location: 'Location 1'
        },
        {
          title: 'Sample Event 2',
          date: '2025-06-02',
          time: '12:00 PM',
          location: 'Location 2'
        }
      ]);
      console.log('Default events inserted');
    }
  })
  .catch(err => console.log(err));

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
