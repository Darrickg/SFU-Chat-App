import express from 'express';
import mysql from 'mysql2'
import { Faculty } from './models';

const PORT = process.env.PORT || 8080;
const MYSQL_URI = process.env.MYSQL_URI || 'localhost';
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'project';
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD

// Database setup
const pool = mysql.createPool({
    host: MYSQL_URI,
    user: 'root',
    database: MYSQL_DATABASE,
    password: MYSQL_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0
});

// Express setup
const app = express();

app.use('/', express.static('./dist'))

app.get('/api/', (request, response) => {
    console.log(request.method, request.url);
    const sql = 'SELECT * FROM faculties';
    pool.query(sql, (error, rows) => {
        if (error) {
            console.log(error);
            response.sendStatus(500);
            return;
        }

        console.log(rows);
        response.json(rows);
    });
});

app.post('/api/:faculty/', (request, response) => {
    console.log(request.method, request.url);
    const faculty: Faculty = {
        facultyName: request.params.faculty
    };

    const sql = "INSERT INTO faculties (facultyName) VALUES ('" + faculty.facultyName + "')";
    pool.query(sql, (error, rows) => {
        if (error) {
            console.log(error);
            response.sendStatus(500);
            return;
        }

        console.log(rows);
        response.sendStatus(200);
    });
});

app.get('/api/:faculty', (request, response) => {
    console.log(request.method, request.url);
    const faculty: Faculty = {
        facultyName: request.params.faculty
    };

    const sql = "SELECT * FROM courses WHERE facultyName = '" + faculty.facultyName + "'";
    pool.query(sql, (error, rows) => {
        if (error) {
            console.log(error);
            response.sendStatus(500);
            return;
        }

        console.log(rows);
        response.json(rows);
    });
})

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
