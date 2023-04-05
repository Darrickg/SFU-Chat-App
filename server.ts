import express from 'express';
import mysql from 'mysql2';
import { Course, Faculty, Message, Section, User } from './models';

const PORT: number = Number(process.env.PORT) || 8080;
const MYSQL_URI: string = process.env.MYSQL_URI || 'localhost';
const MYSQL_DATABASE: string = process.env.MYSQL_DATABASE || 'project';
const MYSQL_PASSWORD: string | undefined = process.env.MYSQL_PASSWORD
const ENDPOINT = {
    api: '/api',
    faculty: ':facultyName',
    course: ':courseID',
    section: ':sectionID',
    user: 'user/:user',
    message: 'message'
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

// Helper functions
function arrayHasUndefined(array: any[]): boolean {
    array.forEach(element => {
        if (element === undefined) {
            return true;
        }
    });

    return false;
}

// Express setup
const app = express();

app.use(express.json());
app.use('/', express.static('./dist'));
app.use((request, _response, next) => {
    console.log(request.method, request.url);
    next();
});

// Express endpoints
const API_URL = ENDPOINT.api;
app.get(API_URL, (_request, response) => {
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
    const faculty: Faculty = {
        facultyName: `'${request.params.facultyName}'`
    };

    const sql = `INSERT INTO faculties (facultyName)`
        + ` VALUES (${faculty.facultyName})`;
    pool.query(sql, (error, rows) => {
        if (error) {
            console.log(error);
            if (error.code === 'ER_DUP_ENTRY') {
                response.sendStatus(409);
            } else {
                response.sendStatus(500);
            }
            return;
        }

        console.log(rows);
        response.sendStatus(200);
    });
});

const COURSE_URL = [FACULTY_URL, ENDPOINT.course].join('/');
app.get(COURSE_URL, (request, response) => {
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
        if (error) {
            console.log(error);
            if (error.code === 'ER_DUP_ENTRY') {
                response.sendStatus(409);
            } else {
                response.sendStatus(500);
            }
            return;
        }

        console.log(rows);
        response.sendStatus(200);
    });
});

const SECTION_URL = [COURSE_URL, ENDPOINT.section].join('/');
app.get(SECTION_URL, (request, response) => {
    const section: Section = {
        sectionID: `'${request.params.sectionID}'`,
        courseID: `'${request.params.courseID}'`,
        facultyName: `'${request.params.facultyName}'`
    };

    const sql = 'SELECT * FROM sections'
        + ` WHERE (facultyName = ${section.facultyName}`
        + ` AND courseID = ${section.courseID}`
        + ` AND sectionID = ${section.sectionID})`;
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
    const section: Section = {
        sectionID: `'${request.params.sectionID}'`,
        courseID: `'${request.params.courseID}'`,
        facultyName: `'${request.params.facultyName}'`
    };

    const sql = 'INSERT INTO sections (facultyName, courseID, sectionID)'
        + ` VALUES (${section.facultyName}, ${section.courseID}, ${section.sectionID})`;
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

const USER_URL = [ENDPOINT.api, ENDPOINT.user].join('/');
app.get(USER_URL, (request, response) => {
    const user: User = {
        email: `'${request.body.email}'`,
        firstName: null,
        lastName: null
    };

    const sql = 'SELECT * FROM users'
        + ` WHERE email = ${user.email}`;
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

app.post(USER_URL, (request, response) => {
    const user: User = {
        email: `'${request.body.email}'`,
        firstName: null,
        lastName: null
    };

    if (request.body.firstName) {
        user.firstName = `'${request.body.firstName}'`;
    }
    if (request.body.lastName) {
        user.lastName = `'${request.body.lastName}'`;
    }

    const sql = 'INSERT INTO users (email, firstName, lastName)'
        + `VALUES (${user.email}, ${user.firstName}, ${user.lastName})`;
    pool.query(sql, (error, rows) => {
        if (error) {
            console.log(error);
            if (error.code === 'ER_DUP_ENTRY') {
                response.sendStatus(409);
            } else {
                response.sendStatus(500);
            }
            return;
        }

        console.log(rows);
        response.json(rows);
    });
});

const MESSAGE_URL = [ENDPOINT.api, ENDPOINT.message].join('/');
app.get(MESSAGE_URL, (request, response) => {
    const requiredParams = [
        request.body,
        request.body.facultyName,
        request.body.courseID,
        request.body.sectionID,
        request.body.messageLimit
    ];
    if (arrayHasUndefined(requiredParams)) {
        response.sendStatus(503);
        return;
    }

    const sql = 'SELECT * FROM messages'
        + ` WHERE (facultyName = '${request.body.facultyName}'`
        + ` AND courseID = '${request.body.courseID}'`
        + ` AND sectionID = '${request.body.sectionID}')`
        + ' ORDER BY time'
        + ` LIMIT ${request.body.messageLimit}`;
    pool.query(sql, (error, rows) => {
        if (error) {
            console.log(error);
            if (error.code === 'ER_DUP_ENTRY') {
                response.sendStatus(409);
            } else {
                response.sendStatus(500);
            }
            return;
        }

        console.log(rows);
        response.json(rows);
    });
});

app.post(MESSAGE_URL, (request, response) => {
    const requiredParams = [
        request.body,
        request.body.email,
        request.body.sectionID,
        request.body.courseID,
        request.body.facultyName,
        request.body.text
    ];
    if (arrayHasUndefined(requiredParams)) {
        response.sendStatus(503);
        return;
    }

    const message: Message = {
        email: `'${request.body.email}'`,
        sectionID: `'${request.body.sectionID}'`,
        courseID: `'${request.body.courseID}'`,
        facultyName: `'${request.body.facultyName}'`,
        time: new Date,
        text: `'${request.body.text}'`
    };

    const sql = 'INSERT INTO messages (email, sectionID, courseID, facultyName, time, text)'
        + ` VALUES (${message.email}, ${message.sectionID}, ${message.courseID}, ${message.facultyName},`
        + ` ${message.time} ${message.text})`;
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

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
