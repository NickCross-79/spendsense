import 'dotenv/config';
import mongoose from 'mongoose';
import express from 'express';
import getRoutes from './routes/getRoutes.js';
import postRoutes from './routes/postRoutes.js';
import deleteRoutes from './routes/deleteRoutes.js';
import cors from 'cors';
import * as plaid from 'plaid';

// Initialize app and DB connection
const app = express();
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;

// Using cors middleware to enable cross-origin resource sharing
app.use(cors());

// Mounting routes on app
app.use(getRoutes);
app.use(postRoutes);
app.use(deleteRoutes);

// Listening for errors and logging DB connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(3001);
});