<template class="flex flex-col gap-4 ">
  <h3 class="text-3xl font-bold sticky top-0 z-50 bg-gray-200 w-full">
    {{facultyName.toUpperCase() + courseID.toUpperCase()}}
  </h3>
  <MessagesList :user-i-d="userName" :messages="messages"/>
  <MessageForm :faculty-name="facultyName" :course-i-d="courseID" :username="userName" />
</template>

<script>
import DiscussionNav from '@/components/Discussion/DiscussionNav.vue'
import MessageForm from '@/components/Messages/MessageForm'
import MessagesList from '@/components/Messages/MessagesList'
import CourseInfo from '@/components/CourseInfo.vue'
import MessageRestController from '@/components/Messages/MessageHandling'
import axios from "axios";

export default {
  name: 'DiscussionView',
  components: {
    MessageForm,
    MessagesList,
  },
  beforeCreate() {
    (MessageRestController.getMessage(this.facultyName, this.courseID)).then((data)=>{
      this.messages = data;
    })
  },
  data() {
    return {
      facultyName: 'CMPT',
      courseID: '372',
      messages:[],
      userName:''
      }
    }

}
</script>
