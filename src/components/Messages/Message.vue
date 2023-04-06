<template>
  <div class="w-1/3 h-fit flex flex-col gap-4 border-2 items-start rounded shadow p-4" :class="this.userIsAuthor ? `self-end` : `self-start`">
    <p>{{ `Author:` + email }}</p>
    <p class="break-words">{{ text }}</p>
    <p>{{`Time: ${time}`}}</p>
  </div>
</template>

<script >
export default {
  name: "Message",
  components:{
  },
  props:{
    email:'',
    userEmail:'',
    text:'',
    time:new Date,

  },
  computed:{
    userIsAuthor(){
      return this.userEmail === this.email;
    }
  }
}
</script >

<style scoped>

</style>