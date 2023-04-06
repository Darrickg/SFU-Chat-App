<!--
    On homepage, main feed of messages
    Not servers section of Discord, more main page of reddit/fb
    List of chats user is in
    Can list by course name, recent activity
    Can pin courses
    Next to each course is direct link to the 3 most recent discussions? Would be convenient
-->
<template>
    <!-- <ul v-for="course in courses" :key="course.id" class="container text-white bg-gray-800">
      <li class="hover:text-gray-600 hover:bg-white">
        <router-link to="/cmpt372">{{course.name}}</router-link></li>
    </ul> -->
    <div v-for="course in courses" :key="course.id">
      <div class="course">
        <h3> {{ course.name }} </h3>
        <p>professor: {{  course.professor }}</p>
      </div>
    </div>
</template>

<script>
import {ref} from "vue";
export default {
  name: 'ChatsList',
  setup(){
    const courses=ref([ // THIS IS TEMPORARY, WE SHOULD GET A LIST OF COURSES FROM THE FILTERS
      {
        name:"CMPT 372",
        professor:"Bobby Chan",
      },
      {
        name:"CMPT 376",
        professor:"Bobby Chan",
      },
      {
        name:"CMPT 295",
        professor:"Bobby Chan",
      },
      {
        name:"MATH 152",
        professor:"Bobby Chan",
      },
    ]);

    return{courses};
  },
  props: {

  }
}
</script>

<style scoped>
.course {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}


</style>
