const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan')
require('dotenv').config();

const studentRoutes = require('./routes/studentRoutes');
const resourceRoutes = require('./routes/resourceRoutes');

const app = express();


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'))

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/resources', resourceRoutes);

// MongoDB connection
// mongoose.connect('mongodb://localhost:27017/OnlineResourceHub') [use on local host]
mongoose.connect('mongodb+srv://solomon:solobeef@cluster0.bkl8f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = app;
