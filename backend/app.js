import 'dotenv/config';
import express from 'express';
import getRoutes from './routes/getRoutes.js';
import postRoutes from './routes/postRoutes.js';
import deleteRoutes from './routes/deleteRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

// Request logging (silenced during tests)
if(process.env.NODE_ENV !== 'test') {
    app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

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

// Unknown routes
app.use((req, res) => {
    res.status(404).json({msg: 'Not found'});
});

// Central error handler: anything passed to next(err) or thrown from
// middleware ends up here instead of leaking a stack trace or hanging.
app.use((err, req, res, next) => {
    console.error(err);
    if(res.headersSent) return next(err);
    res.status(500).json({msg: 'Internal server error'});
});

export default app;
