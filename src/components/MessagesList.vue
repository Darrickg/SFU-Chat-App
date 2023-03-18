<!--
    Shows all sent messages
    Username, date, message
    Edit/delete buttons for user's own messages
    Profs/TAs can delete any messages
-->
<template>
  <ul v-for="message in messages" :key="message.id" class="container flex flex-wrap bg-gray-100">
      <li class="text-black">
        <p>{{message.content}}</p>
        <button>Reply</button>
        <button v-if="ownMessage">✎</button>
        <button v-if="ownMessage || isInstructor">X</button>
      </li>
  </ul>
</template>

<script>
import {ref} from "vue";
export default {
  name: 'MessagesList',
  setup(){
    const messages=ref([//get messages from api
      {content:"Can I get an extension? Pls?"},
      {content:"How do you center a div?"},
      {content:"Angular sucks."},
    ]);
    let ownMessage=new Boolean(true);
    let isInstructor=new Boolean(true);
    return{messages, ownMessage, isInstructor};

  },
  props: {

  }
};
</script>

<style scoped>

</style>
