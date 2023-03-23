<template>
  <CourseInfo/>
  <DiscussionNav/>
  <MessagesList/>
  <MessageForm/>
</template>

<script>
import DiscussionNav from '@/components/DiscussionNav.vue'
import MessageForm from '@/components/MessageForm'
import MessagesList from '@/components/MessagesList'
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
