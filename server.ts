import express from 'express';
import mysql from 'mysql2'
import { Course, Faculty } from './models';

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

app.use(express.json());
app.use('/', express.static('./dist'));

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

app.post('/api/:facultyName/', (request, response) => {
    console.log(request.method, request.url);
    const faculty: Faculty = {
        facultyName: `'${request.params.facultyName}'`
    };

    const sql = `INSERT INTO faculties (facultyName) VALUES (${faculty.facultyName})`;
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

app.get('/api/:facultyName/', (request, response) => {
    console.log(request.method, request.url);
    const faculty: Faculty = {
        facultyName: `'${request.params.facultyName}'`
    };

    const sql = `SELECT * FROM courses WHERE facultyName = ${faculty.facultyName}`;
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

app.post('/api/:facultyName/:courseID/', (request, response) => {
    console.log(request.method, request.url);
    const course: Course = {
        courseID: `'${request.params.courseID}'`,
        facultyName: `'${request.params.facultyName}'`,
        courseName: null
    };

    if (request.body.courseName) course.courseName = `'${request.body.courseName}'`;

    const sql = 'INSERT INTO courses (facultyName, courseID, courseName) VALUES '
        + `(${course.facultyName}, ${course.courseID}, ${course.courseName})`;
    pool.query(sql, (error, rows) => {
        if (error) {
            console.log(error);
            response.send(500);
            return;
        }

        console.log(rows);
        response.sendStatus(200);
    });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
