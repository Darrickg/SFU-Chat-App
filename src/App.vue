<template>
  <AppNav>
  </AppNav>
  <DiscussionNav>
  </DiscussionNav>
</template>

<script>
import AppNav from './components/AppNav.vue'
import DiscussionNav from './components/DiscussionNav.vue'

export default {
  name: 'App',
  components: {
    AppNav,
    DiscussionNav
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
  margin-top: 60px;
}
</style>
