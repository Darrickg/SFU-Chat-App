<template>
  <AppNav>
  </AppNav>
  <DiscussionNav>
  </DiscussionNav>
  <MessagesList>
  </MessagesList>
  <MessageForm>
  </MessageForm>
</template>

<script>
import AppNav from './components/AppNav.vue'
import DiscussionNav from './components/DiscussionNav.vue'
import MessageForm from './components/MessageForm'
import MessagesList from './components/MessagesList'

export default {
  name: 'App',
  components: {
    AppNav,
    DiscussionNav,
    MessageForm,
    MessagesList
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
