<template>
<!--  <AppNav>-->
<!--  </AppNav>-->
<!--  <router-view/>-->
  <CourseChoosing></CourseChoosing>
</template>

<script>
import AppNav from './components/AppNav.vue'
import CourseChoosing from "@/components/CourseChoosing/CourseChoosing.vue";


export default {
  name: 'App',
  components: {
    CourseChoosing,
    AppNav,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
