
export class Courses{
    /**
     *
     * @param {String} department
     */
    constructor(department) {
        this.department = department;
    }

    getDepartment(){return this.department}

    /**
     *
     * @returns {TermInfo[]} courses
     */
    getCourses(){return this.courses}

    /**
     * @param {TermInfo} course
     */
    addCourse(course){this.courses.push(course)}

    /**
     * @param {TermInfo[]} courses
     */
    addCourses(courses){this.courses = courses}

    /**
     * @param {TermInfo} course
     */
    removeCourse(course){this.courses = this.courses.filter(c => c !== course)}
}