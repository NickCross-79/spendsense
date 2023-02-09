require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const getRoutes = require('./routes/getRoutes.js');
const postRoutes = require('./routes/postRoutes.js');
const deleteRoutes = require('./routes/deleteRoutes');

const app = express();
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;

app.use(getRoutes);
app.use(postRoutes);
app.use(deleteRoutes);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(3000);
});