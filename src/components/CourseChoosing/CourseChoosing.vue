<template>
<div
    class="flex flex-col align-center gap-4"
    v-if="!courseLoading">
  <h3 class="text-md-h4">Choose your department and courses</h3>
  <div class="w-1/2 flex flex-col items-center">
    <v-autocomplete
        multiple
        clearable
        chips
        :loading="loading"
        :item-title="`abbr`"
        label="Select department:"
        v-model="departments"
        :items="availableDepartment"
        class="w-full"
        @blur="getAvailableCourses()"
    ></v-autocomplete>
    <button @click="chooseCourseStep = true; getAvailableCourses()" class="self-end bg-gray-100 p-2 px-4 rounded">Next</button>
  </div>
  <div v-if="chooseCourseStep">
    <v-autocomplete
        multiple
        clearable
        chips
        :loading="loading"
        :item-title="(item)=>`${item.courseDept} ${item.courseNumber} ${item.courseSection}`"
        :return-object="true"
        label="Select courses:"
        v-model="chosenCourses"
        :items="availableCourses"
        class="w-full"
        @click.once="getAvailableCourses"
    ></v-autocomplete>
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
      chosenCourses: [],
      availableCourses:[],
      departments:[],
      availableDepartment:[],
      loading: false,
      courseLoading: false,
      autocompleteCount: 0,
      chooseCourseStep: false
    }
  },
  computed: {
    hasItems() {
      return this.chosenCourses.length > 0;
    }
  },
  beforeMount() {
    this.getAvailableDepartment();
  },
  methods: {

    goToCourses: function () {
      this.$router.push({ 
        name: 'home',
        query: { chosenCourses: JSON.stringify(this.chosenCourses) }
      })
    },

    printList: function () {
      console.log(this.chosenCourses[0].courseDept)
    },

    getChosenCourse: function (department) {
      return this.getListCourse(department);
    },
    /**
     * Queries the SFU API for the departments available in the given term
     * @return {string[]}
     */
    getAvailableDepartment: async function () {
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
    getAvailableCourses:  function () {
      this.loading = true;
      this.availableCourses = [];
      for(let department of this.departments){
        getTermInfo("Spring 2023", [department]).then(
            (data) => {
              this.availableCourses = [...this.availableCourses, ...data];
            }
        );
      }
      this.loading = false;
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