import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';

const PORT = process.env.PORT || 3001;

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
