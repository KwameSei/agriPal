// import app from './app.js';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';

// dotenv.config();

// const PORT = process.env.PORT || 5010;
// const MONGO_URI = process.env.MONGO_URI;

// // Connect to MongoDB
// mongoose.connect(MONGO_URI, {
//     useNewUrlParser: true,  // New URL string parser
//     useUnifiedTopology: true,   // Server discovery and monitoring engine
//     useCreateIndex: true,   // Create indexes by default for findOneAndUpdate()
//     useFindAndModify: true,    // Disables findOneAndUpdate() and findOneAndRemove()
// })
//     .then(() => {
//         console.log('MongoDB connected successfully');
//         app.listen(PORT, () => {
//             console.log(`Server running on port: ${PORT}`);
//         });
//     })
//     .catch((error) => {
//         console.log('Error connecting to Database', error.message);
//     });

import { config } from 'dotenv';
import connectDB from './config/database.js';
import app from './app.js';

config({ path: './config.env' });

connectDB();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`);
});

process.on('unhandledRejection', (error) => {
    console.log('Unhandled Rejection', error.message);
    server.close(() => {
        process.exit(1);
    });
});