<template>
  <CourseInfo/>
  <DiscussionNav/>
  <MessagesList/>
  <MessageForm/>
</template>

<script>
import DiscussionNav from '@/components/Discussion/DiscussionNav.vue'
import MessageForm from '@/components/Messages/MessageForm'
import MessagesList from '@/components/Messages/MessagesList'
import CourseInfo from '@/components/CourseInfo.vue'

export default {
  name: 'DiscussionView',
  components: {
    DiscussionNav,
    MessageForm,
    MessagesList,
    CourseInfo
  }
}
</script>
