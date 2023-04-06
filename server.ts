import express from 'express';
import mysql from 'mysql2';
import { Course, Faculty, Message, User, Enrollment } from './models';

const PORT: number = Number(process.env.PORT) || 8080;
const MYSQL_URL: string = process.env.MYSQL_URL || 'localhost';
const MYSQL_DATABASE: string = process.env.MYSQL_DATABASE || 'project';
const MYSQL_PASSWORD: string | undefined = process.env.MYSQL_PASSWORD;
const ENDPOINT = {
    api: '/api',
    faculty: ':facultyName',
    course: ':courseID',
    user: 'users',
    enrollment: 'enrollment',
    message: 'messages'
};

// Database setup
const pool = mysql.createPool({
    host: MYSQL_URL,
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
function arrayHasUndefined(array: unknown[]): boolean {
    array.forEach((element: unknown) => {
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
app.use((request, response, next) => {
    console.log(request.method, request.url);
    response.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// Express endpoints
const USER_URL = [ENDPOINT.api, ENDPOINT.user].join('/');
app.get(USER_URL, (request, response) => {
    if (request.body.email === undefined) {
        response.sendStatus(400);
        return;
    }

    let sql = 'SELECT * FROM users';
    if (request.body.ta === true) {
        sql += ' INNER JOIN tas ON tas.email = users.email';
    } else if (request.body.professor === true) {
        sql += ' INNER JOIN professors ON professors.email = users.email';
    } else if (request.body.admin === true) {
        sql += ' INNER JOIN admins ON admins.email = users.email';
    }
    sql += ' WHERE users.email = ?';

    pool.query(sql, request.body.email, (error, rows) => {
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
        email: request.body.email,
        firstName: null,
        lastName: null
    };

    if (request.body.firstName) {
        user.firstName = request.body.firstName;
    }
    if (request.body.lastName) {
        user.lastName = request.body.lastName;
    }

    const sql = 'INSERT INTO users SET ?';
    pool.query(sql, user, (error, rows) => {
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

const ENROLLMENT_URL = [ENDPOINT.api, ENDPOINT.enrollment].join('/');
app.get(ENROLLMENT_URL, (request, response) => {
    if (request.body.email === undefined) {
        response.sendStatus(400);
    }
    const sql = 'SELECT facultyName, courseID FROM enrollment'
        + ' WHERE email = ?';
    pool.query(sql, request.body.email, (error, rows) => {
       if (error) {
        console.log(error);
        response.sendStatus(500);
        return;
       } 

       console.log(rows);
       response.json(rows);
    });
});

app.post(ENROLLMENT_URL, (request, response) => {
    const requiredParams = [
        request.body.email,
        request.body.facultyName,
        request.body.courseID,
    ];
    if (arrayHasUndefined(requiredParams)) {
        response.sendStatus(400);
        return;
    }

    const enrollment: Enrollment = {
        email: request.body.email,
        facultyName: request.body.facultyName,
        courseID: request.body.courseID
    };

    const sql = 'INSERT INTO enrollment SET ?';
    pool.query(sql, enrollment, (error, rows) => {
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
})


const MESSAGE_URL = [ENDPOINT.api, ENDPOINT.message].join('/');
app.get(MESSAGE_URL, (request, response) => {
    const messageLimit = request.query.limit || 50;
    const requiredParams = [
        request.query.facultyName,
        request.query.courseID,
        messageLimit
    ];
    if (arrayHasUndefined(requiredParams)) {
        response.sendStatus(400);
        return;
    }


    const sql = 'SELECT * FROM ('
        + 'SELECT * from messages'
        + ' WHERE (facultyName = ? AND courseID = ?)'
        + ' ORDER BY time DESC'
        + ' LIMIT ?) AS T1'
        + ' ORDER BY time';
    pool.query(sql, requiredParams, (error, rows) => {
        if (error) {
            response.sendStatus(500);
            return;
        }

        console.log(rows);
        response.json(rows);
    });
});

app.post(MESSAGE_URL, (request, response) => {
    const requiredParams = [
        request.query.email,
        request.query.courseID,
        request.query.facultyName,
        request.query.text
    ];
    if (arrayHasUndefined(requiredParams)) {
        response.sendStatus(503);
        return;
    }

    const message: Message = {
        email: request.query.email,
        courseID: request.query.courseID,
        facultyName: request.query.facultyName,
        time: new Date,
        text: request.query.text
    };

    const sql = 'INSERT INTO messages SET ?';
    pool.query(sql, message, (error, rows) => {
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
        facultyName: request.params.facultyName
    };

    const sql = 'SELECT * FROM courses'
        + ' WHERE facultyName = ?';
    pool.query(sql, faculty.facultyName, (error, rows) => {
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
        facultyName: request.params.facultyName
    };

    const sql = 'INSERT INTO faculties SET ?';
    pool.query(sql, faculty, (error, rows) => {
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
        courseID: request.params.courseID,
        facultyName: request.params.facultyName,
        courseName: null
    }

    const sql = 'SELECT * FROM courses'
        + ' WHERE (facultyName = ? AND courseID = ?)';
    pool.query(sql, [course.facultyName, course.courseID], (error, rows) => {
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
        courseID: request.params.courseID,
        facultyName: request.params.facultyName,
        courseName: null
    };

    if (request.body.courseName) {
        course.courseName = request.body.courseName;
    }

    const sql = 'INSERT INTO courses SET ?';
    pool.query(sql, course, (error, rows) => {
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

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
