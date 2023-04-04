interface Faculty {
    facultyName: string;
}

interface Course {
    courseID: string;
    facultyName: string;
    courseName?: string;
}

interface Section {
    sectionID: string;
    courseID: string;
}

interface User {
    email: string;
    firstName?: string;
    lastName?: string;
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
    id: number;
    email: string;
    sectionID: string;
    time: Date;
    text: string;
    edited: boolean;
}

export {
    Faculty,
    Course,
    Section,
    User,
    Admin,
    Professor,
    TA,
    Message
};
