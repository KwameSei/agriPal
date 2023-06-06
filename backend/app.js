import express from 'express';
import authRoutes from './routes/authRoutes.js';

import errorMiddleware from './middleware/error.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);

// Error handling middleware
// app.use(errorMiddleware);

export default app;