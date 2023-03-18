<template>
  <AppNav>
  </AppNav>
  <DiscussionNav>
  </DiscussionNav>
  <MessagesList>
  </MessagesList>
  <MessageForm>
  </MessageForm>
</template>

<script>

import AppNav from '@/components/AppNav.vue'
import DiscussionNav from '@/components/DiscussionNav.vue'
import MessageForm from '@/components/MessageForm'
import MessagesList from '@/components/MessagesList'

export default {
  name: 'DiscussionView',
  components: {
    AppNav,
    DiscussionNav,
    MessageForm,
    MessagesList
  }
}
</script>
