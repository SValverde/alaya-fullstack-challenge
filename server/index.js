require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const app = express();
const apiPort = 3000;
const db = require('./db');
const postsRoutes = require('./routes/post.routes');
const authRoutes = require('./routes/auth.routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

// Use Passport middleware to authenticate requests
app.use(passport.initialize());

// Routing
const apiRoute = '/api';
app.use(apiRoute, postsRoutes);
app.use(apiRoute, authRoutes);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
