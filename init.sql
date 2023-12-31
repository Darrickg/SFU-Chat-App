DROP DATABASE IF EXISTS project;
CREATE DATABASE project;
USE project;
CREATE TABLE faculties (
    facultyName VARCHAR(8) NOT NULL,
    PRIMARY KEY (facultyName)
);
CREATE TABLE courses (
    facultyName VARCHAR(8) NOT NULL,
    courseID VARCHAR(4) NOT NULL,
    courseName VARCHAR(256),
    FOREIGN KEY (facultyName) REFERENCES faculties(facultyName),
    CONSTRAINT faculty_course PRIMARY KEY (facultyName, courseID)
);
CREATE TABLE users (
    email VARCHAR(256) NOT NULL,
    firstName VARCHAR(256),
    lastName VARCHAR(256),
    PRIMARY KEY(email)
);
CREATE TABLE admins (
    email VARCHAR(256) NOT NULL,
    FOREIGN KEY (email) REFERENCES users(email)
);
CREATE TABLE professors (
    email VARCHAR(256) NOT NULL,
    FOREIGN KEY (email) REFERENCES users(email)
);
CREATE TABLE tas (
    email VARCHAR(256) NOT NULL,
    FOREIGN KEY (email) REFERENCES users(email)
);
CREATE TABLE messages (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(256) NOT NULL,
    courseID VARCHAR(4) NOT NULL,
    facultyName VARCHAR(8) NOT NULL,
    time DATETIME NOT NULL,
    text VARCHAR(4096),
    edited TINYINT NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);
CREATE TABLE enrollment (
    email VARCHAR(265) NOT NULL,
    courseID VARCHAR(4) NOT NULL,
    facultyName VARCHAR(8) NOT NULL,
    FOREIGN KEY (email) REFERENCES users(email),
    FOREIGN KEY (facultyName, courseID) REFERENCES courses(facultyName, courseID)
);
INSERT INTO faculties (facultyName)
VALUES ('CMPT'),
    ('MACM'),
    ('MATH');
INSERT INTO courses (facultyName, courseID)
VALUES ('CMPT', '372'),
    ('CMPT', '376W'),
    ('MACM', '101'),
    ('MATH', '232');
INSERT INTO users (email, firstName, lastName)
VALUES ('bobbyc@sfu.ca', 'Bobby', 'Chan'),
    ('atyndall@sfu.ca', 'Aidan', 'Tyndall'),
    ('seank@sfu.ca', 'Sean', 'K');
INSERT INTO admins (email)
VALUES ('atyndall@sfu.ca');
INSERT INTO professors (email)
VALUES ('bobbyc@sfu.ca');
INSERT INTO enrollment (email, courseID, facultyName)
VALUES ('atyndall@sfu.ca', '372', 'CMPT'),
    ('seank@sfu.ca', '372', 'CMPT');