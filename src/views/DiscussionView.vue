<template class="flex flex-col gap-4 ">
  <h3 class="text-3xl font-bold sticky top-0 z-50 bg-gray-200 w-full">
    {{facultyName.toUpperCase() + courseID.toUpperCase()}}
  </h3>
  <MessagesList/>
  <MessageForm/>
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
    DiscussionNav,
    MessageForm,
    MessagesList,
  },
  beforeCreate() {
    this.messages = Promise.resolve(MessageRestController.getMessage(this.facultyName, this.courseID));
  },
  data() {
    return {
      facultyName: 'CMPT',
      courseID: '372',
      messages:[],
      }
    }

}
</script>
