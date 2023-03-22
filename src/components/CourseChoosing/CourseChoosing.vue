<template>
  <h3>Choose your department and courses</h3>
</template>

<script>
import {Courses} from "@/functions/sfuAPI/courses";
import {getTermInfo} from "@/functions/sfuAPI/termInfoFunctions";

export default {
  name: "CourseChoosing",
  data: function () {
    return {
      courses: [Courses],
    }
  },
  computed: {
    /**
     * @return {string[]}
     *
     **/
    getChosenDepartments: function () {
      return this.courses.map((course) => {
        return course.prototype.getDepartment();
      });
    },
    getChosenCourse: function (department) {
      return this.getCourse(department);
    },
  },
  methods: {
    /**
     * Queries the SFU API for the courses available in the given term, based on the chosen departments
     * @return {Courses[]}
     */
    getAvailableCourses: function () {
      let availableCourses = [];
      for (let department in this.getChosenDepartments) {
        let courses = new Courses(department);
        getTermInfo("Spring 2023", [department]).finally(
            (data) => courses.addCourses(data)
        );
        availableCourses.push(courses);
      }
      return this.getAvailableCourses;
    },

    getCourses: function(){
      return this.courses;
    },
    getCourse: function (department) {
      let course = this.courses.filter((course) => {
        return course.prototype.getDepartment() === department;
      });
      if (course.length === 0) {
        throw new Error("Course not found");
      }
      return course[0];
    },
    /**
     * @param {TermInfo} newCourse
     */
    addCourse: function(newCourse){
      this.getCourse(newCourse.courseDept)
          .addCourse(newCourse);
    },
    /**
     * @param {TermInfo} removedCourse
     */
    removeCourse: function(removedCourse){
      this.getCourse(removedCourse.courseDept).prototype.removeCourse(removedCourse);
    }


  }
}
</script>


<style scoped>

</style>