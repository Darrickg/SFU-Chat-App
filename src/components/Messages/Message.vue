<template>
  <div class="w-1/3 h-fit flex flex-col gap-4 border-2 items-start rounded shadow p-4" :class="this.userIsAuthor ? `self-end` : `self-start`">
    <p>{{`Author:` + authorID}}</p>
    <p class="break-words">{{message}}</p>
    <p>{{`Time: ${time}`}}</p>
  </div>
</template>

<script >
import { register, VueAdvancedChat } from 'vue-advanced-chat'
register();
export default {
  name: "Message",
  components:{
    VueAdvancedChat
  },
  props:{
    userID:'',
    authorID:'',
    message:'',
    time:new Date,

  },
  computed:{
    userIsAuthor(){
      return this.userID === this.authorID;
    }
  }
}
</script >

<style scoped>

</style>