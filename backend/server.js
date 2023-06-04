import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5010;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});