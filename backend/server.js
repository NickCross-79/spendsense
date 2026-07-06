import 'dotenv/config';
import mongoose from 'mongoose';
import express from 'express';
import getRoutes from './routes/getRoutes.js';
import postRoutes from './routes/postRoutes.js';
import deleteRoutes from './routes/deleteRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const PORT = process.env.PORT || 3001;

const app = express();

// Using cors middleware to enable cross-origin resource sharing
const corsOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map(origin => origin.trim())
    : true;
app.use(cors({
    origin: corsOrigins,
    credentials: true,
}));

app.use(cookieParser());

// Mounting routes on app
app.use(getRoutes);
app.use(postRoutes);
app.use(deleteRoutes);

// Connect to DB, then start listening
try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`SpendSense backend listening on port ${PORT}`));
} catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
}

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
