<!--
    On course's main page
    List of all discussions, main feed
    Can list by course name, recent activity
    Shows 3 most recent replies (or snippet of them)
    Can pin courses
    Next to each discussion is direct link to the 3 most recent discussions? Would be convenient
-->
<template>
  <ul v-for="disc in discussions" :key="disc.id" class="container text-white bg-gray-800">
    <li class="hover:text-gray-600 hover:bg-white">
      <router-link to="/cmpt372/assignment-1">{{disc.name}}</router-link></li>
  </ul>
</template>

<script>
import {ref} from "vue";
export default {
  name: 'DiscussionsList',
  setup(){
    const discussions=ref([//get list of discussions from api
      {name:"Assignment 1"},
      {name:"Assignment 2"},
      {name:"Assignment 3"},
      {name:"Group Project"},
    ]);
    return{discussions};
  },
  props: {

  }
}
</script>

<style scoped>

</style>
