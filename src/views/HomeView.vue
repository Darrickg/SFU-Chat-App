<template>
  <div class="courses">
    <ChatsList :chosenCourses="chosenCourses"/>
  </div>
</template>

<script>

import ChatsList from '@/components/ChatsList.vue'

export default {
  name: 'HomeView',
  components: {
    ChatsList
  },
  data() {
    return {
      chosenCourses: [],
    }
  },
  mounted() {
    const chosenCourses = this.$route.query.chosenCourses;
    if (chosenCourses) {
      this.chosenCourses = JSON.parse(chosenCourses);
    }
  },
  // methods: {
  //   printCourses() {
  //         console.log(this.chosenCourses[0])
  //       }
  // }
}
</script>

<style scoped>
.courses {
    margin-top: 100px;
    border: 2px solid black;
    display: inline-block;
    width: 75%;
}
</style>