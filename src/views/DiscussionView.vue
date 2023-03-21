<template>
  <DiscussionNav/>
  <MessagesList/>
  <MessageForm/>
</template>

<script>
import DiscussionNav from '@/components/DiscussionNav.vue'
import MessageForm from '@/components/MessageForm'
import MessagesList from '@/components/MessagesList'

export default {
  name: 'DiscussionView',
  components: {
    DiscussionNav,
    MessageForm,
    MessagesList
  }
}
</script>
