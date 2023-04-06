<!--
    For submitting new message to discussion
-->
<template>
    <div class="flex flex-row justify-center p-4">
      <v-text-field v-model="message" class="w-1/2 border-solid border-2 border-gray-300 resize-none p-1"></v-text-field>
      <button @click="post()" class="bg-sfu-dark-red text-white rounded-md py-1 hover:bg-gray-500 px-4">submit</button>
    </div>
</template>

<script>
import {MessageRestController} from "@/components/Messages/MessageHandling.js";
export default {
  name: 'MessageForm',
  computed: {

  },
  props: {
    facultyName:'',
    courseID:'',
    email:'',
  },
  emits:['addText'],
  methods:{
    post(){
      console.log({
        facultyName: this.facultyName,
        courseID: this.courseID,
        email: this.email,
        text: this.message
      })
      MessageRestController.postMessage(this.facultyName,this.courseID,this.email,this.message);
      this.$emit('addText',this.message);
      this.message = "";
    }
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
