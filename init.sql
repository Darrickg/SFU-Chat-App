DROP DATABASE IF EXISTS project;
CREATE DATABASE project;
USE project;

CREATE TABLE faculties (
    facultyName varchar(256) NOT NULL,

    PRIMARY KEY (facultyName),
    UNIQUE (facultyName)
);

CREATE TABLE courses (
    facultyName varchar(256) NOT NULL,
    courseID VARCHAR(4) NOT NULL,
    courseName varchar(256),

    FOREIGN KEY (facultyName) REFERENCES faculties(facultyName)
);

INSERT INTO faculties (facultyName) VALUES
('CMPT'), ('MACM'), ('MATH');

INSERT INTO courses (facultyName, courseID) VALUES
('CMPT', '372'),
('CMPT', '376W'),
('MACM', '101'),
('MATH', '232');
