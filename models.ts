import { Schema, model } from 'mongoose';

const facultySchema = new Schema({
    facultyName: { type: String, required: true }
});
const Faculty = model('faculty', facultySchema);

const courseSchema = new Schema({
    courseID: { type: Number, required: true },
    departmentName: { type: String, required: true },
    courseName: { type: String }
});
const Course = model('course', courseSchema);

const sectionSchema = new Schema({
    sectionID: { type: Number, required: true },
    courseID: { type: Number, required: true }
});
const Section = model('section', sectionSchema);

const userSchema = new Schema({
    email: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String }
});
const User = model('user', userSchema);

const adminSchema = new Schema({
    email: { type: String, required: true }
});
const Admin = model('admin', adminSchema);

const professorSchema = new Schema({
    email: { type: String, required: true }
});
const Professor = model('professor', professorSchema);

const taSchema = new Schema({
    email: { type: String, required: true }
});
const TA = model('ta', taSchema);

const messageSchema = new Schema({
    id: { type: Number, required: true },
    email: { type: String, required: true },
    sectionID: { type: String, required: true },
    time: { type: Date, required: true },
    text: { type: String, required: true }
});
const Message = model('message', messageSchema);

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
