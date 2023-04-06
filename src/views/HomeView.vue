<template>
  <div class="courses">
    <ChatsList/>
  </div>
</template>

<script>

import ChatsList from '@/components/ChatsList.vue'

export default {
  name: 'HomeView',
  components: {
    ChatsList
  }
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