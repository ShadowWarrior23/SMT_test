const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize app
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/cards', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const cardSchema = new mongoose.Schema({
  text: String,
});

const Card = mongoose.model('Card', cardSchema);

// Routes
app.get('/cards', async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cards' });
  }
});

app.post('/cards', async (req, res) => {
  try {
    const card = new Card(req.body);
    await card.save();
    res.status(201).json(card);
  } catch (error) {
    res.status(500).json({ error: 'Error saving card' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
