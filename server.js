import 'dotenv/config';
import mongoose from 'mongoose';
import express from 'express';
import getRoutes from './routes/getRoutes.js';
import postRoutes from './routes/postRoutes.js';
import deleteRoutes from './routes/deleteRoutes.js';

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