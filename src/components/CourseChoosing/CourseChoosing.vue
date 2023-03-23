<template>
<div class="flex flex-col align-center gap-4">
  <h3 class="text-md-h4">Choose your department and courses</h3>
  <v-autocomplete
      multiple
      clearable
      chips
      :loading="loading"
      label="Select department:"
      v-model="departments"
      :items="availableDepartment"
      class="w-1/2"
      @blur="getAvailableCourses"
  ></v-autocomplete>
  <div v-for="dept in departments" >
    <v-autocomplete v-if="this.getChosenCourse(dept)"
        multiple
        clearable
        chips
        :loading="loading"
        label="Select courses:"
        :value="this.getChosenCourse(dept).getCourses()"
        @change="addCourse($event.target.value)"
        :items="getChosenCourse(dept).getCourses()"
        class="w-1/2"
    >
      <template v-slot:item="{ item }">
        <span>{{ item.courseDept + " " + item.courseNumber }}</span>
      </template>
    </v-autocomplete>
  </div>
</div>
</template>

<script>
import {Courses} from "@/functions/sfuAPI/courses";
import {getDepartmentName, getTermInfo} from "@/functions/sfuAPI/termInfoFunctions";
import {VAutocomplete, VCombobox} from "vuetify/components";
import {de} from "vuetify/locale";

export default {
  name: "CourseChoosing",
  components: {
    VAutocomplete
  },
  data: function () {
    return {
      chosenCourses: [Courses],
      availableCourses: [Courses],
      departments:[],
      availableDepartment:[],
      loading: true,
      courseLoading: true
    }
  },
  computed: {


  },
  beforeMount() {
    this.getAvailableDepartment();
  },
  methods: {
    getChosenCourse: function (department) {
      return this.getListCourse(department);
    },
    /**
     * Queries the SFU API for the departments available in the given term
     * @return {string[]}
     */
    getAvailableDepartment: function () {
      this.loading = true;
      let departments = [String];
      getDepartmentName("Spring 2023").then((data) => {
        return data.map((department) => {
          return department.abbr;
        });
      }).then((data) => {
        this.availableDepartment = data;
        console.log(data);
      });
      this.loading = false;
      this.availableDepartment= departments;
    },

    addDepartment: function (department) {
      if (!this.departments.includes(department)) {
        this.departments.push(department);
      }
    },
    /**
     * Queries the SFU API for the courses available in the given term, based on the chosen departments
     * @return {Courses[]}
     */
    getAvailableCourses: async function () {
      this.courseLoading = true;
      for(let department of this.departments){
        console.log(department);
        if(this.availableCourses.map(course=>course.prototype.getDepartment()).includes(department)){
          continue;
        }
        let courses = new Courses(department);
        getTermInfo("Spring 2023", [department]).then(
            (data) => {
              console.log(data);
              courses.addCourses(data)
            }
        );
        this.availableCourses.push(courses);
      }
      this.courseLoading = false;
    },

    getCourses: function(){
      return this.chosenCourses;
    },
    /**
     * @param {string} department
     * @return {Courses}
     */
    getListCourse: function (department) {
      let course = this.chosenCourses.filter((course) => {
        return course.prototype.getDepartment() === department;
      });
      return course[0];
    },

    /**
     * @param event
     */
    changeCourse: function(event){
      let course = event.target.value;
      let department = course.courseDept;
      let courseExist = this.getListCourse(department).getCourses().includes(course);
      if(courseExist){
        this.removeCourse(course);
      }else{
        this.addCourse(course);
      }

    },

    /**
     * @param {TermInfo} newCourse
     */
    addCourse: function(newCourse){
      let department = this.getListCourse(newCourse.courseDept);
      if(!department){
        department = new Courses(newCourse.courseDept);
      }
      department.prototype.addCourse(newCourse);
      if(!department){
        this.getCourses().push(department);
      }
    },
    /**
     * @param {TermInfo} removedCourse
     */
    removeCourse: function(removedCourse){
      this.getListCourse(removedCourse.courseDept).prototype.removeCourse(removedCourse);
    }


  }
}
</script>


<style scoped>

</style>