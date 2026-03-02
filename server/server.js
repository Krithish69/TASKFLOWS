// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// 1. Load Environment Variables
dotenv.config();

// 2. Connect to Database
connectDB();

const app = express();

// 3. Global Middleware
app.use(cors());
app.use(express.json()); // Essential for reading req.body

// 4. Basic Test Route
app.get('/', (req, res) => {
  res.send('TaskFlow API is Live!');
});

// 5. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));