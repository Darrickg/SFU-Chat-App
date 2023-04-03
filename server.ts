import express from 'express';
import mysql from 'mysql2'

const PORT = process.env.PORT || 8080;
const MYSQL_URI = process.env.MYSQL_URI || 'localhost';
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'project';
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD

// Database setup
mysql.createConnection({
    host: MYSQL_URI,
    user: 'root',
    database: MYSQL_DATABASE,
    password: MYSQL_PASSWORD
});

// Express setup
const app = express();

app.use('/', express.static('./dist'))

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
