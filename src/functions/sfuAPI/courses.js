
export class Courses{
    /**
     *
     * @param {String} department
     */
    constructor(department) {
        this.department = department;
    }

    getDepartment(){return this.department}
    getCourses(){return this.courses}

    /**
     * @param {TermInfo} course
     */
    addCourse(course){this.courses.push(course)}

    /**
     * @param {TermInfo[]} courses
     */
    addCourses(courses){this.courses = this.courses.concat(courses)}

    /**
     * @param {TermInfo} course
     */
    removeCourse(course){this.courses = this.courses.filter(c => c !== course)}
}