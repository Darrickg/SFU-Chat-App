<template>
  <AppNav>
  </AppNav>
  <DiscussionNav>
  </DiscussionNav>
  <MessageForm>
  </MessageForm>
</template>

<script>
import AppNav from './components/AppNav.vue'
import DiscussionNav from './components/DiscussionNav.vue'
import MessageForm from './components/MessageForm'

export default {
  name: 'App',
  components: {
    AppNav,
    DiscussionNav,
    MessageForm
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
