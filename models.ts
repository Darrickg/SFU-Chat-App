interface Faculty {
    facultyName: string;
}

interface Course {
    courseID: string;
    facultyName: string;
    courseName: string | null;
}

interface User {
    email: string;
    firstName: string | null;
    lastName: string | null;
}

interface Admin {
    email: string;
}

interface Professor {
    email: string;
}

interface TA {
    email: string;
}

interface Message {
    id?: number;
    email: string;
    courseID: string;
    facultyName: string;
    time: Date;
    text: string;
    edited?: boolean;
}

interface Enrollment {
    email: string;
    courseID: string;
    facultyName: string;
}

export {
    Faculty,
    Course,
    User,
    Admin,
    Professor,
    TA,
    Message,
    Enrollment
};
