const mongoose = require('mongoose');
const Event = require('./models/event');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('MongoDB connected');

  await Event.deleteMany({}); // Optional: clear existing events

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
  process.exit();
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
