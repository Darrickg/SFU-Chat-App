<!--
    Shows all sent messages
    Username, date, message
    Edit/delete buttons for user's own messages
    Profs/TAs can delete any messages
-->
<template>
  <div class="flex flex-col p-4 gap-4">
  <template v-for="(msg,index) in messages" :key="index">
    <Message v-bind="msg" :user-email="userID"/>
  </template>
  </div>
</template>

<script>
import {ref} from "vue";
import Message from "@/components/Messages/Message.vue";
import {useRoute} from "vue-router";
import axios from "axios";
export default {
  name: 'MessagesList',
  components: {Message},
  setup(){

  },
  props:{
    userID: '',
    messages:[],
  },
  methods:{
  },

};
</script>

<style scoped>
  .textarea{
    background-color:white;
  }

</style>
