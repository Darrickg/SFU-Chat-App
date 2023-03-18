<!--
    On homepage, main feed of messages
    Not servers section of Discord, more main page of reddit/fb
    List of chats user is in
    Can list by course name, recent activity
    Can pin courses
    Next to each course is direct link to the 3 most recent discussions? Would be convenient
-->
<template>
    <ul v-for="course in courses" :key="course.id" class="container text-white bg-gray-800">
      <li class="hover:text-gray-600 hover:bg-white">
        <router-link to="/cmpt376">{{course.name}}</router-link></li>
    </ul>
</template>

<script>
import {ref} from "vue";
export default {
  name: 'ChatsList',
  setup(){
    const courses=ref([//get list of courses from database
      {name:"CMPT 372"},
      {name:"CMPT 376"},
      {name:"CMPT 295"},
      {name:"MATH 152"},
    ]);
    return{courses};
  },
  props: {

  }
}
</script>

<style scoped>

</style>
