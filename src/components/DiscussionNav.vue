<!--
    On all course pages
    List all course discussions, ie:
        Assignment 1
        Assignment 2
        Midterm
    Channels section of Discord
    Profs/TAs can add new discussions
    Profs/TAs have course subnav for all sections
    Can pin and mute discussions from nav
-->
<template>
    <p class="text-white bg-gray-800 w-28">{{course}}</p>
    <nav v-for="disc in discs" :key="disc.id" class="container flex flex-wrap bg-gray-600 w-28">
      <a href="" class="text-white hover:text-gray-600 hover:bg-white">{{disc.name}}</a>
    </nav>
</template>

<script>
import {ref} from "vue";
export default {
  name: 'DiscussionNav',
  setup(){
    const discs=ref([//get list of discs from database
      {name:"Assignment 1"},
      {name:"Assignment 2"},
      {name:"Assignment 3"},
    ]);
    const course="CMPT 372";
    return{discs, course};
  },
  props: {

  }
};
</script>

<style scoped>

</style>
