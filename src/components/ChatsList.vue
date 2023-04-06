<!--
    On homepage, main feed of messages
    Not servers section of Discord, more main page of reddit/fb
    List of chats user is in
    Can list by course name, recent activity
    Can pin courses
    Next to each course is direct link to the 3 most recent discussions? Would be convenient
-->
<template>
    <div v-for="(course, index) in chosenCourses" :key="index">
      <div class="course" @click="goToCourse(course)">
        <h3> {{ course.courseDept }} {{ course.courseNumber }} {{ course.courseSection }}</h3>
        <h4>{{  course.courseName }}</h4>
        <p>Instructor: {{  course.courseDept }}</p>
      </div>
    </div>
</template>

<script>
import {ref, toRaw} from "vue";
export default {
  name: 'ChatsList',
  props: {
    chosenCourses: {
      type: Array
    }
  },
  methods: {
        goToCourse(course) {
          console.log(toRaw(course));
            this.$cookies.set("course", (course));
            this.$router.push({ name: 'discussion' })
        },
    }
}
</script>

<style scoped>
.course {
  background: lightgray;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.course:hover {
  background: #A6192E;
  color:white;
}


</style>
