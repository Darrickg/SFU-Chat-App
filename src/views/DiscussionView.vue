<template class="flex flex-col gap-4 " id="discussion">
  <h3 class="text-3xl font-bold sticky top-0 z-50 bg-gray-200 w-full">
    {{facultyName.toUpperCase() + courseID.toUpperCase()}}
  </h3>
  <MessagesList :user-i-d="userName" :messages="messages"/>
  <MessageForm :faculty-name="facultyName"
               :course-i-d="courseID"
               :email="userName"
               @addText="addText"
  />
</template>

<script>
import DiscussionNav from '@/components/Discussion/DiscussionNav.vue'
import MessageForm from '@/components/Messages/MessageForm'
import MessagesList from '@/components/Messages/MessagesList'
import CourseInfo from '@/components/CourseInfo.vue'
import {MessageRestController} from '@/components/Messages/MessageHandling'
import axios from "axios";
import VueCookies from 'vue-cookies';
import {toRaw} from "vue";

export default {
  name: 'DiscussionView',
  methods: {
    addText(text){
      this.messages.push({
        email:this.userName,
        text:text,
        time: new Date()
      });
    }
  },
  components: {
    MessageForm,
    MessagesList,
  },
  beforeMount() {
    const courseJSON = this.$cookies.get("course");
    this.userName = this.$cookies.get('username');

    this.facultyName = courseJSON["courseDept"];
    this.courseID = courseJSON["courseNumber"];
  },
  mounted(){
    (MessageRestController.getMessage(this.facultyName, this.courseID)).then((data)=>{
      console.log(data);
      this.messages = data;
    }).then(()=>{
      window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
    });
    },
  data() {
    return {
      facultyName: '',
      courseID: '',
      messages:[],
      userName:''
      }
    },


}
</script>
