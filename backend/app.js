import express from 'express';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
// import uploadRoutes from './routes/uploadRoutes.js';
import auth from './middleware/auth.js';
// import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
import cors from 'cors';
import { upload } from './firebase_storage.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(
//   '/api',
//   createProxyMiddleware({
//     target: 'https://api.cloudinary.com/v1_1/   dcgxzrhmo',
//     changeOrigin: true,
//     pathRewrite: { '^/api': '' },
//   }),
// )

// Enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
// app.use('api/image', uploadRoutes)

// Error handling middleware
// app.use(errorMiddleware);

export default app;
