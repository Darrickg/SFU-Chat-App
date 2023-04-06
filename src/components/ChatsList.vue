<!--
    On homepage, main feed of messages
    Not servers section of Discord, more main page of reddit/fb
    List of chats user is in
    Can list by course name, recent activity
    Can pin courses
    Next to each course is direct link to the 3 most recent discussions? Would be convenient
-->
<template>
    <div v-for="course in courses" :key="course.id">
      <div class="course" @click="goToCourse()">
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

  },
  methods: {
        goToCourse() {
            this.$router.push({ name: 'discussion' })
        }
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
