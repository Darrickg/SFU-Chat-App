DROP DATABASE IF EXISTS project;
CREATE DATABASE project;
USE project;
CREATE TABLE faculties (
    facultyName VARCHAR(256) NOT NULL,
    PRIMARY KEY (facultyName)
);
CREATE TABLE courses (
    facultyName VARCHAR(256) NOT NULL,
    courseID VARCHAR(4) NOT NULL,
    courseName VARCHAR(256),
    FOREIGN KEY (facultyName) REFERENCES faculties(facultyName),
    CONSTRAINT faculty_course PRIMARY KEY (facultyName, courseID)
);
CREATE TABLE sections (
    sectionID varchar(4) NOT NULL,
    courseID VARCHAR(4) NOT NULL,
    facultyName VARCHAR(256),
    FOREIGN KEY (facultyName) REFERENCES faculties(facultyName),
    CONSTRAINT faculty_course_section PRIMARY KEY (facultyName, courseID, sectionID)
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
INSERT INTO sections (facultyName, courseID, sectionID)
VALUES ('CMPT', '372', 'D100');