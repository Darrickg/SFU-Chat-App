import express from 'express';
import mysql from 'mysql2';
import { Course, Faculty, Section } from './models';

const PORT: number = Number(process.env.PORT) || 8080;
const MYSQL_URI: string = process.env.MYSQL_URI || 'localhost';
const MYSQL_DATABASE: string = process.env.MYSQL_DATABASE || 'project';
const MYSQL_PASSWORD: string | undefined = process.env.MYSQL_PASSWORD
const ENDPOINT = {
    api: '/api',
    faculty: ':facultyName',
    course: ':courseID',
    section: ':sectionID',
    user: ':user'
};

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

const API_URL = ENDPOINT.api;
app.get(API_URL, (request, response) => {
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

const FACULTY_URL = [ENDPOINT.api, ENDPOINT.faculty].join('/');
app.get(FACULTY_URL, (request, response) => {
    console.log(request.method, request.url);
    const faculty: Faculty = {
        facultyName: `'${request.params.facultyName}'`
    };

    const sql = 'SELECT * FROM courses'
        + ` WHERE facultyName = ${faculty.facultyName}`;
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

app.post(FACULTY_URL, (request, response) => {
    console.log(request.method, request.url);
    const faculty: Faculty = {
        facultyName: `'${request.params.facultyName}'`
    };

    const sql = `INSERT INTO faculties (facultyName)`
        + ` VALUES (${faculty.facultyName})`;
    pool.query(sql, (error, rows) => {
        if (error != null && error.code === 'ER_DUP_ENTRY') {
            console.log(error);
            response.sendStatus(409);
            return;
        } else if (error) {
            console.log(error);
            response.sendStatus(500);
            return;
        }

        console.log(rows);
        response.sendStatus(200);
    });
});

const COURSE_URL = [ENDPOINT.api, ENDPOINT.faculty, ENDPOINT.course].join('/');
app.get(COURSE_URL, (request, response) => {
    console.log(request.method, request.url);
    const course: Course = {
        courseID: `'${request.params.courseID}'`,
        facultyName: `'${request.params.facultyName}'`,
        courseName: null
    }

    const sql = 'SELECT * FROM sections'
        + ` WHERE (facultyName = ${course.facultyName}`
        + ` AND courseID = ${course.courseID})`;
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

app.post(COURSE_URL, (request, response) => {
    console.log(request.method, request.url);
    const course: Course = {
        courseID: `'${request.params.courseID}'`,
        facultyName: `'${request.params.facultyName}'`,
        courseName: null
    };

    if (request.body.courseName) {
        course.courseName = `'${request.body.courseName}'`;
    }

    const sql = 'INSERT INTO courses (facultyName, courseID, courseName)'
        + `VALUES (${course.facultyName}, ${course.courseID}, ${course.courseName})`;
    pool.query(sql, (error, rows) => {
        if (error != null && error.code === 'ER_DUP_ENTRY') {
            console.log(error);
            response.sendStatus(409);
            return;
        } else if (error) {
            console.log(error);
            response.sendStatus(500);
            return;
        }

        console.log(rows);
        response.sendStatus(200);
    });
});

const SECTION_URL = [ENDPOINT.api, ENDPOINT.faculty, ENDPOINT.course, ENDPOINT.section].join('/')
app.get(SECTION_URL, (request, response) => {
    console.log(request.method, request.url);
    const section: Section = {
        sectionID: `'${request.params.sectionID}'`,
        courseID: `'${request.params.sectionID}'`,
        facultyName: `'${request.params.facultyName}'`
    };

    const sql = 'SELECT * FROM sections'
        + ` WHERE (facultyName = ${section.facultyName}`
        + ` AND courseID = ${section.courseID}`
        + ` AND sectionID = ${section.sectionID}`;
    pool.query(sql, (error, rows) => {
        if (error) {
            console.log(error);
            response.send(500);
            return;
        }

        console.log(rows);
        response.json(rows);
    });
});

app.post(SECTION_URL, (request, response) => {
    console.log(request.method, request.url);
    const section: Section = {
        sectionID: `'${request.params.sectionID}'`,
        courseID: `'${request.params.courseID}'`,
        facultyName: `'${request.params.facultyName}'`
    };

    const sql = 'INSERT INTO sections (facultyName, courseID, sectionID)'
        + ` VALUES (${section.facultyName}, ${section.courseID}, ${section.sectionID})`;
    pool.query(sql, (error, rows) => {
        if (error != null && error.code == 'ER_DUP_ENTRY') {
            console.log(error);
            response.sendStatus(409);
            return;
        } else if (error) {
            console.log(error);
            response.sendStatus(500);
            return;
        }

        console.log(rows);
        response.sendStatus(200);
    });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
