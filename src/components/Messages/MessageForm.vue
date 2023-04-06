<!--
    For submitting new message to discussion
-->
<template>
    <div class="flex flex-row justify-center p-4">
      <v-text-field class="w-1/2 border-solid border-2 border-gray-300 resize-none p-1"></v-text-field>
      <button @click="MessageRestController.postMessage(facultyName,courseID,username,message)" class="bg-sfu-dark-red text-white rounded-md p-1 hover:bg-gray-500"></button>
    </div>
</template>

<script>
import {MessageRestController} from "@/components/Messages/MessageHandling.js";
export default {
  name: 'MessageForm',
  computed: {
    MessageRestController() {
      return MessageRestController
    }
  },
  props: {
    facultyName:'',
    courseID:'',
    username:'',

  },
  data(){
    return{
      message:""
    }
  }
}
</script>

<style scoped>

</style>
