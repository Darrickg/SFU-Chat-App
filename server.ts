import express from 'express';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || 'localhost:27017';
const MONGODB_DATABASE = process.env.MONGODB_DATABASE || 'project';

// Database setup
mongoose.connect('mongodb://' + MONGODB_URI + '/' + MONGODB_DATABASE);
const db = mongoose.connection;
db.on('error', (error) => {
    throw error;
});

const app = express();

app.use('/', express.static('./dist'))

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
