// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Auth routes
app.use('/api/auth', require('./routes/route'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
