<!--
    On homepage, main feed of messages
    Not servers section of Discord, more main page of reddit/fb
    List of chats user is in
    Can list by course name, recent activity
    Can pin courses
    Next to each course is direct link to the 3 most recent discussions? Would be convenient
-->
<template>
    <ul v-for="disc in discs" :key="disc.id" class="container flex flex-wrap bg-gray-600 w-28">
      <li class="text-white hover:text-gray-600 hover:bg-white"><a>{{course.name}}</a></li>
    </ul>
</template>

<script>
export default {
  name: 'ChatsList',
  props: {

  }
</script>

<style scoped>

</style>
