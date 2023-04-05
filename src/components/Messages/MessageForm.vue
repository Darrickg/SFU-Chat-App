<!--
    For submitting new message to discussion
-->
<template>
    <form method="post">
      <textarea id="newMessage" class="border-solid border-2 border-gray-300 resize-none p-1 mt-2"></textarea>
      <input type="submit" id="submitMessage" class="bg-sfu-dark-red text-white rounded-md p-1 hover:bg-gray-500" value="send">
    </form>
</template>

<script>
export default {
  name: 'MessageForm',
  props: {

  }
}
</script>

<style scoped>

</style>
